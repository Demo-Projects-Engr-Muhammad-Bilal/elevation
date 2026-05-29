import { useState } from 'react';
import { Plus, PackageSearch, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SectionHeader from '../ui/SectionHeader';
import SearchInput from '../ui/SearchInput';
import ActionButton from '../ui/ActionButton';
import TableActions from '../ui/TableActions';
import EmptyState from '../ui/EmptyState';
import Pagination from '../ui/Pagination';

export default function ProductList({ products = [], onDelete, onEdit, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-7 md:p-10 w-full m-0">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 pb-6 border-b border-gray-100">
        <SectionHeader
          title="Products"
          subtitle="Manage your store inventory"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
          <ActionButton onClick={onAdd} icon={<Plus className="h-4 w-4" />}>
            Add Product
          </ActionButton>
        </div>
      </div>

      {/* Content */}
      {currentProducts.length === 0 ? (
        <EmptyState
          icon={<PackageSearch className="h-12 w-12 mb-3" strokeWidth={1} />}
          message="No products matched your criteria."
        />
      ) : (
        <>
          {/* ================= DESKTOP VIEW (UNTOUCHED & 100% SAME) ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#Fef9f2]/50 transition-colors group">
                    <td className="py-4 flex items-center gap-4">
                      {/* Swiper image carousel */}
                      <div className="h-20 w-20 relative rounded-md border border-gray-200 overflow-hidden flex-shrink-0 cell-swiper-container">
                        {product.images && product.images.length > 0 ? (
                          <>
                            <Swiper
                              spaceBetween={10}
                              slidesPerView={1}
                              navigation={true}
                              onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = `.swiper-button-prev-${product.id}`;
                                swiper.params.navigation.nextEl = `.swiper-button-next-${product.id}`;
                              }}
                              pagination={{ clickable: true }}
                              modules={[Navigation, SwiperPagination]}
                              className="mySwiper rounded-md"
                              style={{
                                '--swiper-navigation-color': '#000',
                                '--swiper-pagination-color': '#000',
                                '--swiper-navigation-size': '18px',
                                '--swiper-pagination-bullet-size': '6px',
                              }}
                            >
                              {product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                  <img
                                    src={img}
                                    alt={`Product ${product.id}-${index}`}
                                    className="object-cover w-full h-full rounded-md"
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>

                            <button className={`swiper-button-prev-${product.id} absolute left-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all`}>
                              <ChevronLeft className="w-3 h-3 text-black" strokeWidth={2.5} />
                            </button>
                            <button className={`swiper-button-next-${product.id} absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all`}>
                              <ChevronRight className="w-3 h-3 text-black" strokeWidth={2.5} />
                            </button>
                          </>
                        ) : (
                          <img
                            src="https://via.placeholder.com/150"
                            alt="Placeholder"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-black">{product.name}</span>
                    </td>
                    <td className="py-4 text-gray-500">{product.category}</td>
                    <td className="py-4 font-medium text-black">${product.price}</td>
                    <td className="py-4 text-right">
                      <TableActions
                        onEdit={() => onEdit(product)}
                        onDelete={() => onDelete(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (FIXED & CARD BASED) ================= */}
          <div className="md:hidden space-y-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex items-start gap-4 hover:bg-[#Fef9f2]/50 transition-colors">
                {/* Swiper image carousel */}
                <div className="h-20 w-20 relative rounded-md border border-gray-200 overflow-hidden flex-shrink-0 cell-swiper-container">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation={true}
                        onBeforeInit={(swiper) => {
                          swiper.params.navigation.prevEl = `.swiper-button-prev-mob-${product.id}`;
                          swiper.params.navigation.nextEl = `.swiper-button-next-mob-${product.id}`;
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation, SwiperPagination]}
                        className="mySwiper rounded-md"
                        style={{
                          '--swiper-navigation-color': '#000',
                          '--swiper-pagination-color': '#000',
                          '--swiper-navigation-size': '16px',
                          '--swiper-pagination-bullet-size': '5px',
                        }}
                      >
                        {product.images.map((img, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={img}
                              alt={`Product ${product.id}-${index}`}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <button className={`swiper-button-prev-mob-${product.id} absolute left-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all`}>
                        <ChevronLeft className="w-3 h-3 text-black" strokeWidth={2.5} />
                      </button>
                      <button className={`swiper-button-next-mob-${product.id} absolute right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all`}>
                        <ChevronRight className="w-3 h-3 text-black" strokeWidth={2.5} />
                      </button>
                    </>
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Details & Actions Content */}
                <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-medium text-black text-sm leading-snug">{product.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <TableActions
                        onEdit={() => onEdit(product)}
                        onDelete={() => onDelete(product.id)}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-semibold text-black text-sm">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemLabel="products"
          />
        </>
      )}
    </div>
  );
}