/**
 * Vehicle utility functions
 */

/**
 * Get brand logo URL by brand name
 * @param brand - Brand name
 * @returns Logo URL or undefined if not found
 */
export function getBrandLogo(brand: string): string | undefined {
  switch (brand.toLowerCase()) {
    case 'bmw':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW_logo_%28gray%29.svg'
    case 'mercedes-benz':
      return 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mercedes-Benz_logo.svg'
    case 'audi':
      return 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Audi_logo_%28gray%29.svg'
    case 'volkswagen':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Volkswagen_logo_%28gray%29.svg'
    case 'toyota':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Toyota_logo_%28gray%29.svg'
    case 'honda':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Honda_logo_%28gray%29.svg'
    case 'ford':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Ford_logo_%28gray%29.svg'
    case 'chevrolet':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Chevrolet_logo_%28gray%29.svg'
    case 'nissan':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Nissan_logo_%28gray%29.svg'
    case 'hyundai':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hyundai_logo_%28gray%29.svg'
    case 'kia':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Kia_logo_%28gray%29.svg'
    case 'lexus':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Lexus_logo_%28gray%29.svg'
    case 'porsche':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Porsche_logo_%28gray%29.svg'
    case 'jaguar':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Jaguar_logo_%28gray%29.svg'
    case 'land rover':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Land_Rover_logo_%28gray%29.svg'
    case 'mini':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Mini_logo_%28gray%29.svg'
    case 'fiat':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Fiat_logo_%28gray%29.svg'
    case 'renault':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Renault_logo_%28gray%29.svg'
    case 'peugeot':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Peugeot_logo_%28gray%29.svg'
    case 'citroen':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Citroen_logo_%28gray%29.svg'
    case 'opel':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Opel_logo_%28gray%29.svg'
    case 'saab':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Saab_logo_%28gray%29.svg'
    case 'volvo':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Volvo_logo_%28gray%29.svg'
    case 'bentley':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bentley_logo_%28gray%29.svg'
    case 'rolls-royce':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Rolls-Royce_logo_%28gray%29.svg'
    case 'aston martin':
      return 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aston_Martin_logo_%28gray%29.svg'
    default:
      return undefined
  }
} 