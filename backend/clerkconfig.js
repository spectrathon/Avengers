import { Clerk as createClerkClient  } from '@clerk/backend';
const clerk = createClerkClient({ secretKey: process.env.CLERK_BACKEND_API_KEY });
export default clerk;