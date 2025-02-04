export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    fileType: 'PDF' | 'EPUB';
    etsyUrl: string;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      title: 'Novel Writing Masterclass',
      description: 'Complete guide to crafting compelling fiction',
      price: 6.99,
      fileType: 'PDF',
      etsyUrl: "https://www.etsy.com/ca/listing/1823226554/ultimate-fantasy-world-building-workbook"
    },
    {
      id: '2',
      title: 'Non-Fiction Pro Guide',
      description: 'Expert techniques for research and storytelling',
      price: 1.99,
      fileType: 'EPUB',
      etsyUrl: 'https://www.etsy.com/ca/listing/1829484477/character-development-printable-workbook?click_key=e72eea614329ffaaafd384b3b79b418ea7810373%3A1829484477&click_sum=bfbb0929&ref=lp_mix_and_match_bundle-2&pro=1&mnm=1'
    }
  ];