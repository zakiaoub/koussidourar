type Mode = 'toPseudo' | 'toFullName';

export function formatBlogName(input: string, mode: Mode): string {
    if (!input) return '';

    if (mode === 'toPseudo') {
        return '@' + input.trim().toLowerCase().replace(/\s+/g, '');
    } else if (mode === 'toFullName') {
        const clean = input.replace(/^@/, '').toLowerCase();
        const parts = clean.match(/[a-z]+/g) || [];
        return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }

    return input;
}