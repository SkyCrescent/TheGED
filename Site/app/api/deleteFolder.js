import fs from 'fs-extra';
import path from 'path';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { folderPath } = req.body;

      // Validation basique pour s'assurer que le chemin est défini
      if (!folderPath) {
         return res.status(400).json({ error: 'Path not provided' });
      }

      // Calcul du chemin absolu
      const absolutePath = path.join(process.cwd(), folderPath);

      try {
         // Suppression du dossier de manière récursive
         await fs.remove(absolutePath);
         return res.status(200).json({ message: 'Folder deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Failed to delete folder', details: error.message });
      }
   } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}