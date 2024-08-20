import { useParams } from 'react-router-dom';

const SingleItemPage = () => {
  const { category, itemId } = useParams();

  return (
    <div>
      SingleItemPage {category} {itemId}
    </div>
  );
};

export default SingleItemPage;
