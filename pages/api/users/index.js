import connect from '@/lib/db'; // Import your database connection function
import User from '@/model/User'; // Ensure consistency in naming

export default async function handler(req, res) {
    await connect(); // Connect to MongoDB

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const responses = await User.find({}); // Fetch all responses
                res.status(200).json({ success: true, data: responses });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'POST':
            try {
                const { data } = req.body; // Extract data from body

                const newResponse = new User.create({ data
                 }); // Create a new document

                await newResponse.save(); // Save the document
                res.status(201).json({ success: true, data });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
            break;
    }
}