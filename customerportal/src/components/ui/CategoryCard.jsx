import { GenericCard } from './GenericCard';

export const CategoryCard = ({ category, image }) => {
          return (
                    <GenericCard
                              id={`cat-${category.id || category.name}`}
                              images={[image]}
                              linkTo={`/products?category=${category.name?.toLowerCase()}`}
                              title={category.name}
                              bottomText={category.description}
                    />
          );
};