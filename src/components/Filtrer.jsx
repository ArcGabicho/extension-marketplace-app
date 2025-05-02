import Arrow from '../icons/Arrow';
import GitHub from '../icons/GitHub';

import { useState } from 'react';

function Filtrer({ extensions }) {
    const Categorias = ['Todos', 'AdBlocking', 'Productividad', 'Personalización', 'Utilitarios', 'Shopping', 'Redes Sociales', 'Seguridad', 'IA', 'Videojuegos'];
    const [modalOpen, setModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const toggleModal = () => {
        if (modalOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setModalOpen(false);
                setIsClosing(false);
            }, 300);
        } else {
            setModalOpen(true);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        toggleModal();
        
        if (!extensions) {
            console.warn('Missing required prop: extensions array');
            return;
        }

        const filteredExtensions = category === 'Todos' 
            ? extensions 
            : extensions.filter(extension => extension.category === category);
        
        // Disparar evento personalizado con las extensiones filtradas
        const event = new CustomEvent('filter-extensions', {
            detail: filteredExtensions
        });
        document.dispatchEvent(event);
    };

    return (
        <>
            <h1 className="text-4xl font-bold my-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Extensions List
            </h1>
            <div className="flex flex-wrap justify-center gap-4 font-normal lg:gap-5">
                <button
                    className="flex items-center gap-2 text-white bg-gradient-to-r from-[#00bf63] to-[#15193e] rounded-xl px-5 py-2.5 transition-all duration-300 hover:from-[#00d973] hover:to-[#1a1f4a] hover:scale-105 hover:shadow-lg hover:shadow-[#00bf63]/20"
                    onClick={toggleModal}
                >
                    <Arrow />
                    <span className="font-medium">{selectedCategory}</span>
                </button>
                <a
                    href="https://github.com/GaboGabito05/extension-marketplace-api"
                    target="_blank"
                    className="flex items-center gap-2 text-white bg-gradient-to-r from-[#00bf63] to-[#15193e] rounded-xl px-5 py-2.5 transition-all duration-300 hover:from-[#00d973] hover:to-[#1a1f4a] hover:scale-105 hover:shadow-lg hover:shadow-[#00bf63]/20"
                >
                    <GitHub />
                    <span className="font-medium">API RESTful</span>
                </a>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div
                        className={`bg-zinc-900/90 text-white rounded-xl p-6 w-full max-w-2xl border border-zinc-800 ${
                            isClosing ? 'modal-close' : 'modal-open'
                        }`}
                    >
                        <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Selecciona una categoría</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {Categorias.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center gap-2 bg-zinc-800/50 px-4 py-3 rounded-xl cursor-pointer hover:bg-zinc-700/50 transition-colors duration-200"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={selectedCategory === category}
                                        onChange={() => handleCategorySelect(category)}
                                        className="form-radio text-[#00bf63]"
                                    />
                                    <span className="text-sm font-medium">{category}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            className="mt-6 w-full text-white bg-gradient-to-r from-[#00bf63] to-[#15193e] rounded-xl px-4 py-2.5 transition-all duration-300 hover:from-[#00d973] hover:to-[#1a1f4a] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00bf63]/20 font-medium"
                            onClick={toggleModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Filtrer;