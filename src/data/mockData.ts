export const mockProperties = [
    {
        id: "1",
        title: "Magnifique appartement avec vue",
        description: "Superbe appartement avec vue panoramique sur le lac. Entièrement rénové avec des matériaux de qualité.",
        price: 750000,
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        ],
        location: {
            address: "123 Rue du Lac",
            city: "Genève",
            postalCode: "1200",
            canton: "GE"
        },
        rooms: 4.5,
        area: 120,
        transactionType: "sell",
        features: {
            bathrooms: 2,
            floor: 3,
            totalFloors: 5,
            parkingSpaces: 1
        }
    },
    {
        id: "2",
        title: "Studio moderne au centre-ville",
        description: "Studio entièrement meublé au cœur de la ville. Idéal pour étudiant ou jeune professionnel.",
        price: 1500,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
        ],
        location: {
            address: "45 Rue Centrale",
            city: "Lausanne",
            postalCode: "1003",
            canton: "VD"
        },
        rooms: 1.5,
        area: 35,
        transactionType: "rent",
        features: {
            bathrooms: 1,
            floor: 2,
            totalFloors: 4,
            parkingSpaces: 0
        }
    },
    {
        id: "3",
        title: "Villa familiale avec jardin",
        description: "Spacieuse villa avec grand jardin dans un quartier calme et résidentiel.",
        price: 1200000,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        ],
        location: {
            address: "8 Chemin des Fleurs",
            city: "Montreux",
            postalCode: "1820",
            canton: "VD"
        },
        rooms: 6.5,
        area: 220,
        transactionType: "sell",
        features: {
            bathrooms: 3,
            floor: 0,
            totalFloors: 2,
            parkingSpaces: 2
        }
    }
];

export const mockUser = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+41 79 123 45 67",
    role: "user",
    verified: true
}; 