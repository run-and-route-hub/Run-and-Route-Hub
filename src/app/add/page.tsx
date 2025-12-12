import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddRouteForm from '@/components/AddRouteForm';
import { evaluateAwards } from '@/lib/awardLogic';

const AddRoute = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <AddRouteForm />
    </main>
  );
};

await evaluateAwards(user.email);

export default AddRoute;
