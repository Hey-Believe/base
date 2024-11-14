declare module "*.json" {
    const value: {
        contributors?: {
            id: string
            name: string
            image: string
            role: string
        }[]
        projects?: {
            id: string
            title: string
            description: string
            logo: string
            license: string
            repoUrl: string
        }[]
    }
    export default value
} 