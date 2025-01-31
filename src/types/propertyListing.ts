export type PropertyCategory =
    | "residential"
    | "commercial"
    | "land"
    | "parking";

export const propertyCategories: Record<PropertyCategory, string> = {
    residential: "Résidentiel",
    commercial: "Commercial",
    land: "Terrain",
    parking: "Parking",
};

export type PropertyType = {
    id: string;
    label: string;
    category: PropertyCategory;
};

export const propertyTypes: Record<string, PropertyType> = {
    // Résidentiel
    apartment: {
        id: "apartment",
        label: "Appartement",
        category: "residential",
    },
    house: { id: "house", label: "Maison", category: "residential" },
    villa: { id: "villa", label: "Villa", category: "residential" },
    chalet: { id: "chalet", label: "Chalet", category: "residential" },
    loft: { id: "loft", label: "Loft", category: "residential" },
    studio: { id: "studio", label: "Studio", category: "residential" },
    duplex: { id: "duplex", label: "Duplex", category: "residential" },
    penthouse: { id: "penthouse", label: "Penthouse", category: "residential" },

    // Commercial
    office: { id: "office", label: "Bureau", category: "commercial" },
    shop: { id: "shop", label: "Commerce", category: "commercial" },
    restaurant: {
        id: "restaurant",
        label: "Restaurant",
        category: "commercial",
    },
    warehouse: { id: "warehouse", label: "Entrepôt", category: "commercial" },
    industrial: {
        id: "industrial",
        label: "Local industriel",
        category: "commercial",
    },
    hotel: { id: "hotel", label: "Hôtel", category: "commercial" },

    // Terrain
    buildingLand: {
        id: "buildingLand",
        label: "Terrain à bâtir",
        category: "land",
    },
    agriculturalLand: {
        id: "agriculturalLand",
        label: "Terrain agricole",
        category: "land",
    },
    industrialLand: {
        id: "industrialLand",
        label: "Terrain industriel",
        category: "land",
    },

    // Parking
    indoorParking: {
        id: "indoorParking",
        label: "Place intérieure",
        category: "parking",
    },
    outdoorParking: {
        id: "outdoorParking",
        label: "Place extérieure",
        category: "parking",
    },
    garage: { id: "garage", label: "Garage individuel", category: "parking" },
    carport: { id: "carport", label: "Carport", category: "parking" },
};

export interface PropertyFormData {
    type: string;
    category: string;
    propertyType: string;
    title: string;
    description: string;
    price: number;
    location: {
        address: string;
        city: string;
        postalCode: string;
        canton: string;
    };
    features: {
        area: number;
        rooms: number;
        bathrooms: number;
        floor: number;
        totalFloors: number;
        parkingSpaces: number;
    };
    images: File[];
    subscriptionPlan: string;
    paymentMethod: string;
}
