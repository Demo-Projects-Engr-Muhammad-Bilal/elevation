import { useState } from 'react';
import { toast } from 'sonner';
import { useCategories } from '../../hooks/useCategories';
import PageLoader from '../ui/PageLoader';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import Modal from '../Modal';

export default function CategoryManager() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return <PageLoader />;

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category.');
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, formData);
      } else {
        await createCategory(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <CategoryList
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
          onAdd={handleOpenCreate}
        />
      </div>

      {/* Parent component height control kar raha hai */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="h-auto md:h-fit">
        <CategoryForm
          initialData={selectedCategory}
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}