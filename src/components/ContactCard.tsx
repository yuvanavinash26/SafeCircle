import React from 'react';
import type { Contact } from '../types';
import { Phone, Star, Trash2, MapPin } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onDial?: (phone: string) => void;
  onDelete?: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onDial,
  onDelete
}) => {
  return (
    <div className="p-4 rounded-xl glass-panel border border-slate-800/80 hover:border-slate-700/50 flex items-center justify-between gap-4 text-left transition-all group">
      <div className="flex gap-3 items-center">
        {/* Avatar or Placeholder icon */}
        {contact.avatar ? (
          <img 
            src={contact.avatar} 
            alt={contact.name} 
            className="w-11 h-11 rounded-xl object-cover border border-slate-800"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-brand-purple-400 text-sm">
            {contact.name.charAt(0)}
          </div>
        )}

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-white text-sm">{contact.name}</h4>
            {contact.isEmergency && (
              <span className="p-0.5 rounded bg-brand-red-500/10 border border-brand-red-500/20 text-brand-red-400">
                <Star className="w-2.5 h-2.5 fill-brand-red-500 text-brand-red-500" />
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">{contact.relationship} &bull; {contact.phone}</p>
          
          {contact.lastLocation && (
            <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>Last: {contact.lastLocation}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {onDial && (
          <a
            href={`tel:${contact.phone}`}
            onClick={(e) => {
              e.preventDefault();
              onDial(contact.phone);
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-purple-500/30 text-slate-400 hover:text-white transition-colors"
            title={`Dial ${contact.phone}`}
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </a>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-red-500/30 text-slate-400 hover:text-brand-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Delete contact"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
export default ContactCard;
