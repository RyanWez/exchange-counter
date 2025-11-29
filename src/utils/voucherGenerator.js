import html2canvas from 'html2canvas';

export const generateVoucherImage = async (element) => {
    if (!element) return null;

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: '#1a1a1a', // Match app background or specific color
            scale: 2, // Higher quality
            logging: false,
            useCORS: true
        });
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error("Failed to generate voucher image", error);
        return null;
    }
};

export const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
