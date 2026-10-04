import { useEffect } from 'react';

export function useSEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title === 'RarePairs' ? title : `${title} | RarePairs`;
    }
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
  }, [title, description]);
}
