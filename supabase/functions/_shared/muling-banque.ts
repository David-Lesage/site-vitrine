// Coordonnées bancaires de Muling : une seule source côté serveur, le réglage `muling_bank_settings`.
// Vide ou illisible : null. Aucun IBAN de repli dans le code.
import type { CoordonneesBancaires } from './muling-email-modele.ts';

// deno-lint-ignore no-explicit-any
export async function lireBanque(admin: any): Promise<CoordonneesBancaires | null> {
    const { data, error } = await admin.from('muling_bank_settings').select('beneficiary, iban, bic, bank').maybeSingle();
    if (error) {
        console.error('muling_bank_settings:', error);
        return null;
    }
    return data?.iban ? data as CoordonneesBancaires : null;
}
