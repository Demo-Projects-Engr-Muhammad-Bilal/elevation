import { useState } from 'react';
import { toast } from 'sonner';
import { useHero } from '../../hooks/useHero';
import PageLoader from '../ui/PageLoader';
import HeroList from './HeroList';
import HeroForm from './HeroForm';
import Modal from '../Modal';
import DeleteToast from '../ui/DeleteToast'; // Generic toast component import kar liya

export default function HeroManager() {
  const { slides, loading, createSlide, updateSlide, deleteSlide } = useHero();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null); // null = create, object = edit
  const [isFormLoading, setIsFormLoading] = useState(false);

  if (loading) return <PageLoader />;

  const handleCreateClick = () => {
    setSelectedSlide(null);
    setIsModalOpen(true);
  };

  // Fix: use local state data instead of fetching from Firestore on every edit click
  const handleEditClick = (id) => {
    const slide = slides.find((s) => s.id === id);
    setSelectedSlide(slide ?? null);
    setIsModalOpen(true);
  };

  // 🛠️ Window.confirm ko hata kar generic Sonner Action lagaya hai
  const handleDelete = (id) => {
    const uniqueToastId = `delete-slide-${id}`;

    toast(
      <DeleteToast
        id={id}
        toastId={uniqueToastId}
        onConfirm={deleteSlide}
        itemName="slide" // Yahan "slide" pass kiya hai taake message main "delete this slide?" likha aaye
      />,
      {
        id: uniqueToastId,
        duration: Infinity // Jab tak user action na le, toast rahega
      }
    );
  };

  const handleFormSubmit = async (formData) => {
    setIsFormLoading(true);
    try {
      if (selectedSlide) {
        await updateSlide(selectedSlide.id, formData);
      } else {
        await createSlide(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('Failed to save slide.');
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <HeroList
        slides={slides}
        onCreateClick={handleCreateClick}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className='h-[80vh]! md:h-auto!'>
        <HeroForm
          initialData={selectedSlide}
          onSubmit={handleFormSubmit}
          isLoading={isFormLoading}
        />
      </Modal>
    </div>
  );
}