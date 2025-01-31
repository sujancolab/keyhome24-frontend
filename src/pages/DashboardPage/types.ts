export interface UserListing {
    id: string;
    title: string;
    location: string;
    price: string;
    image: string;
    views: number;
    status: "paid" | "pending";
    hasBeenEdited: boolean;
    description?: string;
}
