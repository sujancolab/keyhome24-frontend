import { Property } from "../types/property";

export const properties: Property[] = [
    {
        id: "1",
        title: "Appartement, 4.5 pidddèces, 120 m²",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        price: 950000,
        rooms: 4.5,
        baths: 2,
        area: 120,
        location: {
            npa: "1007",
            city: "Lausanne",
            address: "Rue du Lac 25",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "apartment",
        transactionType: "buy",
    },
    {
        id: "2",
        title: "Villa, 7.5 pièces, 280 m²",
        imageUrl:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        price: 2450000,
        rooms: 7.5,
        baths: 3,
        area: 280,
        location: {
            npa: "1095",
            city: "Lutry",
            address: "Chemin des Vignes 8",
        },
        features: {
            parking: true,
            garden: true,
        },
        type: "villa",
        transactionType: "buy",
    },
    {
        id: "3",
        title: "Studio meublé au centre-ville",
        imageUrl:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        price: 1200,
        rooms: 1.5,
        baths: 1,
        area: 35,
        location: {
            npa: "1003",
            city: "Lausanne",
            address: "Rue Centrale 15",
        },
        features: {
            parking: false,
            garden: false,
        },
        type: "studio",
        transactionType: "rent",
    },
    {
        id: "4",
        title: "Loft industriel rénové",
        imageUrl:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        price: 1450000,
        rooms: 3.5,
        baths: 2,
        area: 150,
        location: {
            npa: "1227",
            city: "Carouge",
            address: "Rue des Artisans 10",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "loft",
        transactionType: "buy",
    },
    {
        id: "5",
        title: "Penthouse avec vue panoramique",
        imageUrl:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        price: 3200000,
        rooms: 5.5,
        baths: 3,
        area: 200,
        location: {
            npa: "1006",
            city: "Lausanne",
            address: "Avenue de la Gare 30",
        },
        features: {
            parking: true,
            garden: true,
        },
        type: "penthouse",
        transactionType: "buy",
    },
    {
        id: "6",
        title: "Chalet traditionnel avec vue",
        imageUrl:
            "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
        price: 1850000,
        rooms: 4.5,
        baths: 2,
        area: 160,
        location: {
            npa: "1884",
            city: "Villars-sur-Ollon",
            address: "Route des Alpes 45",
        },
        features: {
            parking: true,
            garden: true,
        },
        type: "chalet",
        transactionType: "buy",
    },
    {
        id: "7",
        title: "Bureau moderne au cœur des affaires",
        imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c",
        price: 4500,
        rooms: 6,
        baths: 2,
        area: 180,
        location: {
            npa: "1204",
            city: "Genève",
            address: "Rue du Rhône 65",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "office",
        transactionType: "rent",
    },
    {
        id: "8",
        title: "Local commercial avec vitrine",
        imageUrl:
            "https://images.unsplash.com/photo-1582037928769-181f2644ecb7",
        price: 2800,
        rooms: 2,
        baths: 1,
        area: 85,
        location: {
            npa: "1003",
            city: "Lausanne",
            address: "Rue de Bourg 15",
        },
        features: {
            parking: false,
            garden: false,
        },
        type: "shop",
        transactionType: "rent",
    },
    {
        id: "9",
        title: "Restaurant équipé",
        imageUrl:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        price: 5500,
        rooms: 4,
        baths: 2,
        area: 220,
        location: {
            npa: "1800",
            city: "Vevey",
            address: "Quai Perdonnet 12",
        },
        features: {
            parking: true,
            garden: true,
        },
        type: "restaurant",
        transactionType: "rent",
    },
    {
        id: "10",
        title: "Terrain à bâtir avec vue lac",
        imageUrl:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        price: 1200000,
        rooms: 0,
        baths: 0,
        area: 800,
        location: {
            npa: "1814",
            city: "La Tour-de-Peilz",
            address: "Chemin des Vignes",
        },
        features: {
            parking: false,
            garden: true,
        },
        type: "buildingLand",
        transactionType: "buy",
    },
    {
        id: "11",
        title: "Place de parking intérieure",
        imageUrl:
            "https://images.unsplash.com/photo-1590674899484-d5640e854abe",
        price: 45000,
        rooms: 0,
        baths: 0,
        area: 15,
        location: {
            npa: "1004",
            city: "Lausanne",
            address: "Avenue d'Ouchy 40",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "indoorParking",
        transactionType: "buy",
    },
    {
        id: "12",
        title: "Duplex contemporain",
        imageUrl:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        price: 3500,
        rooms: 4.5,
        baths: 2,
        area: 140,
        location: {
            npa: "1820",
            city: "Montreux",
            address: "Avenue du Casino 32",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "duplex",
        transactionType: "rent",
    },
    {
        id: "13",
        title: "Entrepôt logistique moderne",
        imageUrl:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        price: 4200,
        rooms: 1,
        baths: 1,
        area: 450,
        location: {
            npa: "1030",
            city: "Bussigny",
            address: "Zone Industrielle",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "warehouse",
        transactionType: "rent",
    },
    {
        id: "14",
        title: "Local industriel avec bureaux",
        imageUrl:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
        price: 850000,
        rooms: 4,
        baths: 2,
        area: 350,
        location: {
            npa: "1023",
            city: "Crissier",
            address: "Route de l'Industrie",
        },
        features: {
            parking: true,
            garden: false,
        },
        type: "industrial",
        transactionType: "buy",
    },
    {
        id: "15",
        title: "Hôtel boutique",
        imageUrl:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        price: 3500000,
        rooms: 15,
        baths: 16,
        area: 800,
        location: {
            npa: "1820",
            city: "Montreux",
            address: "Rue du Lac 75",
        },
        features: {
            parking: true,
            garden: true,
        },
        type: "hotel",
        transactionType: "buy",
    },
];

export default properties;
