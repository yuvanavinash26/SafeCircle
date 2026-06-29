import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ContactCard from '../../components/ContactCard';
import Modal from '../../components/Modal';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { useContacts } from '../../hooks/useContacts';
import type { Contact } from '../../types';
import { UserPlus, Star, ShieldAlert, Search, RefreshCw, AlertCircle } from 'lucide-react';

interface ContactFormInputs {
  name: string;
  relationship: string;
  phone: string;
  isEmergency: boolean;
}

export const EmergencyContacts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    contacts,
    isLoading,
    isError,
    refetch,
    createContact,
    updateContact,
    deleteContact
  } = useContacts(searchQuery);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: '',
      relationship: 'Family',
      phone: '',
      isEmergency: true
    }
  });

  const handleDial = (phoneNumber: string) => {
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [
      ...prev,
      {
        id: toastId,
        type: 'info',
        message: `DIALING: Opening phone gateway dialer to ${phoneNumber}...`
      }
    ]);
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'success',
          message: 'Contact removed from your Guardian Circle.'
        }
      ]);
    } catch (err: any) {
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'warning',
          message: `Failed to delete contact: ${err.message}`
        }
      ]);
    }
  };

  const handleFormSubmit = async (data: ContactFormInputs) => {
    try {
      if (editingContact) {
        await updateContact({ id: editingContact.id, contact: data });
        setToasts(prev => [
          ...prev,
          {
            id: `toast-${Date.now()}`,
            type: 'success',
            message: `${data.name} details updated.`
          }
        ]);
      } else {
        await createContact(data);
        setToasts(prev => [
          ...prev,
          {
            id: `toast-${Date.now()}`,
            type: 'success',
            message: `${data.name} added as emergency Guardian.`
          }
        ]);
      }
      handleCloseModal();
    } catch (err: any) {
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'warning',
          message: `Failed to save contact: ${err.message}`
        }
      ]);
    }
  };

  const handleOpenAddModal = () => {
    setEditingContact(null);
    reset({
      name: '',
      relationship: 'Family',
      phone: '',
      isEmergency: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact: Contact) => {
    setEditingContact(contact);
    reset({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      isEmergency: contact.isEmergency
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Header Row */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-900/60 pb-5">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-xl tracking-tight">Emergency Guardian Circle</h3>
          <p className="text-xs text-slate-400">Designated contacts notified instantly during active SOS events.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => refetch()} 
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading && 'animate-spin'}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 font-bold text-xs rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-white/5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Guardian</span>
          </button>
        </div>
      </div>

      {/* Info Warning banner */}
      <div className="p-4 rounded-xl bg-brand-purple-500/10 border border-brand-purple-500/25 flex items-center gap-3 text-xs leading-normal">
        <ShieldAlert className="w-5 h-5 text-brand-purple-400 shrink-0 animate-pulse" />
        <p className="text-slate-300">
          <strong>Guard Directive:</strong> Standard alerts transmit coordinates dynamically via Twilio networks. Ensure numbers include international prefixes (+91 for India).
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
        <input 
          type="text"
          placeholder="Search guardians by name or relationship..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50 transition-colors"
        />
      </div>

      {/* Contacts List Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs border border-slate-800/80 bg-slate-900/10 rounded-2xl">
          Fetching contact nodes...
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-brand-red-400 text-xs border border-brand-red-500/20 bg-brand-red-500/5 rounded-2xl">
          Failed to fetch contact database. Verify server connection.
        </div>
      ) : contacts.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
          No guardian nodes registered matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map(c => (
            <ContactCard 
              key={c.id} 
              contact={c} 
              onDial={handleDial}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingContact ? "Edit Guardian Profile" : "Register Emergency Contact"}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Aarav Sharma" 
              className={`w-full bg-slate-900 border rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none transition-colors ${
                errors.name ? 'border-brand-red-500 focus:border-brand-red-500' : 'border-slate-800 focus:border-brand-purple-500/50'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className="text-[10px] text-brand-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Relationship</label>
            <select 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none cursor-pointer focus:border-brand-purple-500/50"
              {...register('relationship', { required: 'Relationship is required' })}
            >
              <option value="Family">Family (Mother/Father/Spouse)</option>
              <option value="Friend">Friend</option>
              <option value="Neighbour">Neighbour</option>
              <option value="Colleague">Colleague</option>
              <option value="Police Helpline">Police Helpline / Authority</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Phone number</label>
            <input 
              type="tel" 
              placeholder="e.g. +91 98765 43210" 
              className={`w-full bg-slate-900 border rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none transition-colors ${
                errors.phone ? 'border-brand-red-500 focus:border-brand-red-500' : 'border-slate-800 focus:border-brand-purple-500/50'
              }`}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[0-9\s-]{10,15}$/,
                  message: 'Enter a valid phone number (min 10 digits)'
                }
              })}
            />
            {errors.phone && (
              <span className="text-[10px] text-brand-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="isEmergencyCheck"
              className="w-4 h-4 text-brand-purple-600 rounded bg-slate-900 border-slate-800 cursor-pointer focus:ring-0 focus:ring-offset-0"
              {...register('isEmergency')}
            />
            <label htmlFor="isEmergencyCheck" className="text-xs font-bold text-slate-200 cursor-pointer flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-brand-red-500 fill-brand-red-500" />
              <span>Mark as Primary Emergency Contact</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="submit" 
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white font-bold text-xs cursor-pointer border border-white/5 shadow-lg shadow-brand-purple-500/10"
            >
              {editingContact ? 'Save Changes' : 'Verify & Add'}
            </button>
            <button 
              type="button" 
              onClick={handleCloseModal}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
      
    </div>
  );
};

export default EmergencyContacts;
