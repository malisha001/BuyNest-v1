// Function to get all products
export async function getProducts() {
    try {
        const response = await fetch('/api/product/getproducts'); // Using the proxy
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error.message);
    }
}
