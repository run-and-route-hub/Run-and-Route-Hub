import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddRouteForm from '@/components/AddRouteForm';

const AddRoute = async () => {
  (
    <main>
      <AddRouteForm />
    </main>
  );
};

export default AddRoute;
