import { Clerk } from '@clerk/clerk-sdk-node';

// Initialize Clerk SDK
Clerk({ apiKey: process.env.CLERK_API_KEY });

export async function POST(req) {
  const { userId, role } = await req.json();

  try {
    // Fetch user by userId
    const user = await Clerk.users.updateUser(userId, {
      unsafeMetadata: {
        role: role,  // Assign the 'NGO' role
      },
    });

    return new Response(JSON.stringify({ message: 'Role updated successfully!' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update role' }), { status: 500 });
  }
}
