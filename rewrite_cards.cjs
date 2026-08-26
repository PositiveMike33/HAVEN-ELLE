const fs = require('fs');

const file = 'src/components/TrustedContactsManager.tsx';
let content = fs.readFileSync(file, 'utf8');

const ContactCardStr = `
const ContactCard: React.FC<{
  contact: TrustedContact;
  tierInfo: { label: string; bg: string };
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (updatedContact: TrustedContact) => void;
}> = ({ contact, tierInfo, onToggleActive, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: contact.name,
    relationship: contact.relationship,
    phone: contact.phone || '',
    email: contact.email || '',
  });

  const handleSave = () => {
    onSave({
      ...contact,
      name: editForm.name,
      relationship: editForm.relationship,
      phone: editForm.phone,
      email: editForm.email,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={\`bg-[#FFFFFF] rounded-2xl border p-5 shadow-[0_2px_12px_-2px_rgba(90,90,64,0.04)] transition-all \${
        contact.isActive
          ? 'border-[#E5E2D9] hover:border-[#CED6C1]'
          : 'border-[#E5E2D9] opacity-60 bg-[#F5F2ED]/60'
      }\`}
    >
      {isEditing ? (
        <div className="space-y-3 mb-3">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="w-full text-sm font-bold text-[#3E3B39] p-2 rounded-lg border border-[#CED6C1] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
            placeholder="Nom du contact"
          />
          <input
            type="text"
            value={editForm.relationship}
            onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
            className="w-full text-xs text-[#8E8B82] p-2 rounded-lg border border-[#CED6C1] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
            placeholder="Relation (ex: Sœur, Avocate)"
          />
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center font-bold text-sm">
              {contact.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#3E3B39] flex items-center gap-2">
                {contact.name}
                {contact.isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#8A9A5B]" title="Contact Actif" />
                )}
              </h4>
              <p className="text-xs text-[#8E8B82]">{contact.relationship}</p>
            </div>
          </div>
          <span className={\`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border \${tierInfo.bg}\`}>
            {tierInfo.label}
          </span>
        </div>
      )}

      <div className="space-y-1.5 text-xs text-[#3E3B39] bg-[#F8F7F2] p-3 rounded-xl border border-[#E5E2D9] mb-3">
        {isEditing ? (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#8E8B82] uppercase">Téléphone</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-1.5 rounded border border-[#CED6C1] text-xs focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-[10px] font-bold text-[#8E8B82] uppercase">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-1.5 rounded border border-[#CED6C1] text-xs focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />
            </div>
          </>
        ) : (
          <>
            {contact.phone && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#8E8B82]">
                  <Phone className="w-3.5 h-3.5 text-[#8A9A5B]" /> Téléphone :
                </span>
                <a href={\`tel:\${contact.phone}\`} className="font-mono text-[#3E3B39] font-medium hover:underline">
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#8E8B82]">
                  <Mail className="w-3.5 h-3.5 text-[#8A9A5B]" /> Email :
                </span>
                <a href={\`mailto:\${contact.email}\`} className="font-mono text-[#3E3B39] font-medium truncate max-w-[180px] hover:underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.secretCodeWord && (
              <div className="flex items-center justify-between pt-1 border-t border-[#E5E2D9]">
                <span className="flex items-center gap-1.5 text-[#5A5A40] font-medium">
                  <Key className="w-3.5 h-3.5 text-[#8A9A5B]" /> Mot de code secret :
                </span>
                <span className="font-bold text-[#5A5A40] bg-[#E5EAD9] px-2 py-0.5 rounded-md text-[11px]">
                  "{contact.secretCodeWord}"
                </span>
              </div>
            )}
            {contact.notes && (
              <p className="text-[11px] text-[#8E8B82] pt-1 border-t border-[#E5E2D9] italic">
                Note : {contact.notes}
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => onToggleActive(contact.id)}
            className={\`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors \${
              contact.isActive
                ? 'bg-[#E5EAD9] text-[#5A5A40] border-[#CED6C1] hover:bg-[#d8e0ca]'
                : 'bg-[#F5F2ED] text-[#8E8B82] border-[#E5E2D9] hover:bg-[#eae6de]'
            }\`}
          >
            {contact.isActive ? 'Actif en cas d\\'alerte' : 'Désactivé'}
          </button>
        ) : (
          <div /> // Spacer
        )}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              Sauvegarder
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-[#F8F7F2] border border-[#E5E2D9] hover:bg-[#E5EAD9] text-[#5A5A40] rounded-lg text-xs font-bold transition-colors"
                title="Modifier / Renommer"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="p-1.5 text-[#8E8B82] hover:text-[#A64D4D] hover:bg-[#F5E6E0] rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
`;

const blockStartStr = `          filteredContacts.map((contact) => {
            const tierInfo = getTierBadge(contact.tier);
            return (
              <div`;

const blockEndStr = `                </div>
              </div>
            );
          })
        )}
      </div>`;

// Find the block
const startIdx = content.indexOf(blockStartStr);
const endIdx = content.indexOf(blockEndStr) + blockEndStr.length;

if (startIdx !== -1 && endIdx > startIdx) {
  const replacement = `          filteredContacts.map((contact) => {
            const tierInfo = getTierBadge(contact.tier);
            return (
              <ContactCard
                key={contact.id}
                contact={contact}
                tierInfo={tierInfo}
                onToggleActive={handleToggleActive}
                onDelete={handleDelete}
                onSave={(updated) => {
                  const newContacts = contacts.map(c => c.id === updated.id ? updated : c);
                  onUpdateContacts(newContacts);
                  StorageService.saveContacts(newContacts);
                  showToast('Contact mis à jour avec succès');
                }}
              />
            );
          })
        )}
      </div>`;
  
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  
  // Also add ContactCard to the end of the file
  content += "\n\n" + ContactCardStr;
  
  // also add Trash2 if missing? It's imported.
  // Wait, Phone, Mail, Key, Edit3, Trash2 are used in ContactCard. We need to make sure they are imported.
  
  fs.writeFileSync(file, content);
  console.log("Success");
} else {
  console.log("Failed to find block");
}
