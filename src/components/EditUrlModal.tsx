import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, Check, ExternalLink, Trash2 } from 'lucide-react';
import { LinkItem } from '../types';

interface EditUrlModalProps {
  item: LinkItem | null;
  currentCustomUrl?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, url: string) => void;
}

export const EditUrlModal: React.FC<EditUrlModalProps> = ({
  item,
  currentCustomUrl,
  isOpen,
  onClose,
  onSave
}) => {
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if (item) {
      setUrlInput(currentCustomUrl || item.url || '');
    }
  }, [item, currentCustomUrl]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item.id, urlInput.trim());
    onClose();
  };

  const handleClear = () => {
    setUrlInput('');
    onSave(item.id, '');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#090e17] border border-cyan-500/40 rounded-2xl w-full max-w-lg p-5 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <LinkIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 font-tech text-base">
                Vincular Planilha Online
              </h3>
              <p className="text-xs text-slate-400">{item.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wider">
              URL da Planilha na Nuvem (Google Sheets, OneDrive, SharePoint)
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono-code"
              autoFocus
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Ao vincular a URL, você poderá abrir sua planilha ao vivo diretamente em uma nova aba a qualquer momento.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            {currentCustomUrl ? (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl border border-rose-900/40 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover Vínculo</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors font-medium"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 text-xs bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Salvar Link</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
