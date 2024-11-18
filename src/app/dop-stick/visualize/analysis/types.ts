export interface FacetSize {
    name: string;
    count: number;
}

export interface DiamondAnalytics {
    statistics: {
        totalFacets: number;
        totalSelectors: number;
        totalUnknownSelectors: number;
    };
    securityMetrics: {
        score: number;
        hasUpgradeMechanism: boolean;
        hasAccessControl: boolean;
        unknownFunctions: number;
        riskFactors: string[];
    };
    functionDistribution: {
        total: number;
        known: number;
        unknown: number;
        byFacet: FacetSize[];
    };
    facetAnalysis: {
        largest: FacetSize;
        smallest: FacetSize;
        averageSize: number;
        distribution: FacetSize[];
    };
    functionComplexity: Array<{
        params: number;
        count: number;
    }>;
    functionTypes: Array<{
        name: string;
        value: number;
    }>;
    eventAnalysis: Array<{
        name: string;
        events: number;
    }>;
    interfaceCompliance: Array<{
        name: string;
        compliant: boolean;
    }>;
    accessPatterns: Array<{
        name: string;
        value: number;
    }>;
    complexityMetrics: {
        averageComplexity: number;
        totalFunctions: number;
        complexityDistribution: Array<{
            params: number;
            count: number;
        }>;
    };
} 