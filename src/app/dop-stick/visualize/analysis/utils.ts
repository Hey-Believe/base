interface Facet {
    name: string;
    address: string;
    statistics: {
        totalSelectors: number;
        foundSelectors: number;
        unknownSelectors: number;
    };
    selectors: {
        found: {
            selector: string;
            name: string;
            signature: string;
            mutability: string;
        }[];
        unknown: {
            selector: string;
            reason: string;
        }[];
    };
    events: {
        name: string;
        signature: string;
    }[];
}

export function analyzeFunctionComplexity(facets: Facet[]) {
    // Count parameters for each function
    const parameterCounts = facets.flatMap(facet =>
        facet.selectors.found.map(selector => {
            const params = selector.signature
                ? selector.signature.split('(')[1]?.split(')')[0]?.split(',').filter(Boolean).length
                : 0;
            return params;
        })
    );

    // Group by parameter count
    const complexity = parameterCounts.reduce((acc, count) => {
        acc[count] = (acc[count] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    // Convert to array format for chart
    return Object.entries(complexity)
        .map(([params, count]) => ({
            params: Number(params),
            count,
        }))
        .sort((a, b) => a.params - b.params);
}

export function analyzeFunctionTypes(facets: Facet[]) {
    const types = {
        view: 0,
        pure: 0,
        payable: 0,
        nonpayable: 0,
        unknown: 0,
    };

    facets.forEach(facet => {
        facet.selectors.found.forEach(selector => {
            const mutability = selector.mutability?.toLowerCase() || 'unknown';
            types[mutability as keyof typeof types]++;
        });
        types.unknown += facet.selectors.unknown.length;
    });

    return Object.entries(types)
        .filter(([_, value]) => value > 0)
        .map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
        }));
}

export function analyzeEvents(facets: Facet[]) {
    return facets
        .filter(facet => facet.events.length > 0)
        .map(facet => ({
            name: facet.name.length > 15 ? facet.name.substring(0, 15) + '...' : facet.name,
            events: facet.events.length,
        }))
        .sort((a, b) => b.events - a.events);
}

export function analyzeInterfaces(facets: Facet[]) {
    // Common ERC interfaces and their signature patterns
    const commonInterfaces = [
        {
            name: 'ERC165',
            signatures: ['supportsInterface(bytes4)'],
        },
        {
            name: 'ERC721',
            signatures: [
                'balanceOf(address)',
                'ownerOf(uint256)',
                'transferFrom(address,address,uint256)',
            ],
        },
        {
            name: 'ERC1155',
            signatures: [
                'balanceOf(address,uint256)',
                'balanceOfBatch(address[],uint256[])',
                'setApprovalForAll(address,bool)',
            ],
        },
        {
            name: 'Diamond',
            signatures: [
                'diamondCut((address,uint8,bytes4[])[],address,bytes)',
                'facetAddress(bytes4)',
                'facetAddresses()',
            ],
        },
    ];

    // Get all function signatures
    const allSignatures = facets.flatMap(facet =>
        facet.selectors.found.map(s => s.signature)
    );

    // Check each interface
    return commonInterfaces.map(interface_ => {
        const compliant = interface_.signatures.every(sig =>
            allSignatures.some(s => s?.includes(sig))
        );
        return {
            name: interface_.name,
            compliant,
        };
    });
}

export function analyzeFacetDistribution(facets: Facet[]) {
    return facets
        .map(facet => ({
            name: facet.name.length > 15 ? facet.name.substring(0, 15) + '...' : facet.name,
            count: facet.statistics.totalSelectors,
        }))
        .sort((a, b) => b.count - a.count);
}

export function analyzeAccessPatterns(facets: Facet[]) {
    const patterns = {
        onlyOwner: 0,
        onlyAdmin: 0,
        public: 0,
        other: 0,
    };

    facets.forEach(facet => {
        facet.selectors.found.forEach(selector => {
            const signature = selector.signature?.toLowerCase() || '';
            if (signature.includes('onlyowner')) {
                patterns.onlyOwner++;
            } else if (signature.includes('onlyadmin')) {
                patterns.onlyAdmin++;
            } else if (signature.includes('public')) {
                patterns.public++;
            } else {
                patterns.other++;
            }
        });
    });

    return Object.entries(patterns)
        .filter(([_, value]) => value > 0)
        .map(([name, value]) => ({
            name: name
                .split(/(?=[A-Z])/)
                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                .join(' '),
            value,
        }));
}

export function calculateComplexityScore(facets: Facet[]) {
    let totalComplexity = 0;
    let totalFunctions = 0;

    facets.forEach(facet => {
        facet.selectors.found.forEach(selector => {
            const paramCount = selector.signature
                ? selector.signature.split('(')[1]?.split(')')[0]?.split(',').filter(Boolean).length
                : 0;
            totalComplexity += paramCount;
            totalFunctions++;
        });
    });

    return {
        averageComplexity: totalFunctions > 0 ? totalComplexity / totalFunctions : 0,
        totalFunctions,
        complexityDistribution: analyzeFunctionComplexity(facets),
    };
} 