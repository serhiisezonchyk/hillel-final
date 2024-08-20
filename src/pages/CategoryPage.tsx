import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  return <div>CategoryPage {category}</div>;
};

export default CategoryPage;
