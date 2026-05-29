import { useState } from 'react';
import { toast } from 'sonner';
import { useProducts } from '../../hooks/useProducts';
import PageLoader from '../ui/PageLoader';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Modal from '../Modal';
import DeleteToast from '../ui/DeleteToast'; // Yahan path update karein agar zaroorat ho

export default function ProductsManager() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // null = create, object = edit
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return <PageLoader />;

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🛠️ Generic DeleteToast component lagaya hai
  const handleDelete = (id) => {
    const uniqueToastId = `delete-product-${id}`;

    toast(
      <DeleteToast
        id={id}
        toastId={uniqueToastId}
        onConfirm={deleteProduct}
        itemName="product"
      />,
      {
        id: uniqueToastId,
        duration: Infinity
      }
    );
  };

  return (
    <div>
      <div>
        <ProductList
          products={products}
          onDelete={handleDelete}
          onEdit={handleOpenEdit}
          onAdd={handleOpenCreate}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className='h-[80vh]! md:h-auto!'>
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}