import React, { useState, useEffect } from 'react';
import ContactCard from '../../components/ContactCard';
import Modal from '../../components/Modal';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { mockContacts } from '../../mock/dummyData';
import type { Contact } from '../../types';
import { UserPlus, Star, ShieldAlert } from 'lucide-react';
import { apiService } from '../../services/api';

export const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add Contact Form State
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [phone, setPhone] = useState('');
  const [isEmergency, setIsEmergency] = useState(true);

  useEffect(() => {
    apiService.getContacts()
      .then(data => {
        if (data && data.length > 0) {
          setContacts(data);
        }
      })
      .catch(err => console.log('Using local contacts fallback:', err));
  }, []);

  const handleDial = (phoneNumber: string) => {
    // Simulated Dial
    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      type: 'info',
      message: `DIALING: Initiating simulation voice call to ${phoneNumber}...`
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteContact(id);
    } catch (err) {
      console.log('API delete failed or offline');
    }
    setContacts(prev => prev.filter(c => c.id !== id));
    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      type: 'success',
      message: 'Contact removed from your Guardian Circle.'
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const savedContact = await apiService.addContact({
        name,
        relationship,
        phone,
        isEmergency
      });
      setContacts(prev => [...prev, savedContact]);
    } catch (err) {
      const fallbackContact: Contact = {
        id: `c-${Date.now()}`,
        name,
        relationship,
        phone,
        isEmergency
      };
      setContacts(prev => [...prev, fallbackContact]);
    }
    setIsModalOpen(false);

    // Reset Form
    setName('');
    setRelationship('Family');
    setPhone('');
    setIsEmergency(true);

    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      type: 'success',
      message: `${name} has been added as a verified Guardian.`
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Header Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-base">Emergency Guardian Circle</h3>
          <p className="text-xs text-slate-400">Designated contacts notified instantly during active SOS events.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 font-bold text-xs rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-white/5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Guardian</span>
        </button>
      </div>

      {/* Info Warning banner */}
      <div className="p-4 rounded-xl bg-brand-purple-500/10 border border-brand-purple-500/25 flex items-center gap-3 text-xs leading-normal">
        <ShieldAlert className="w-5 h-5 text-brand-purple-400 shrink-0" />
        <p className="text-slate-300">
          <strong>Important Guidelines:</strong> Ensure phone numbers include country codes (+91 for India). Standard carrier costs or fallback SMS alerts use these exact parameters.
        </p>
      </div>

      {/* Grid List */}
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

      {/* Add Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Emergency Contact">
        <form onSubmit={handleAddContact} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Aarav Sharma" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Relationship</label>
            <select 
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50 cursor-pointer"
            >
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Local Authority">Local Authority (Helpline/Police)</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Phone number</label>
            <input 
              type="tel" 
              placeholder="e.g. +91 98765 43210" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="isEmergencyCheck"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
              className="w-4 h-4 text-brand-purple-600 rounded bg-slate-900 border-slate-800 cursor-pointer focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="isEmergencyCheck" className="text-xs font-bold text-slate-200 cursor-pointer flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-brand-red-500 fill-brand-red-500" />
              <span>Mark as Primary Emergency Contact</span>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button 
              type="submit" 
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-white font-bold text-xs"
            >
              Verify & Add
            </button>
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
      
      {/* FUTURE LOGIC: Connect CRUD operations to the backend API inside controllers/contacts.ts linking MongoDB schema. */}
    </div>
  );
};
export default EmergencyContacts;
