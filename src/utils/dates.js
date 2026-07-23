export default function Dates(valor) {
    const fecha = new Date(valor);
    return fecha.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' });
}