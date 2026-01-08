export interface Review {
    id: string;
    rating: number;
    review: string;
    buyerName: string;
    date: string; // Format: "YYYY-MM-DD"
  }

export interface Product {
    id: string;
    title: string;
    description: string;
    fileType: 'PDF' | 'EPUB';
    price?: number | undefined;
    etsyUrl: string;
    etsyListingId?: string; // Optional: Etsy listing ID for fetching reviews
    imageUrl: string;
    videoUrl?: string; // Optional: video to show on hover
    priceId: string;
    reviews?: Review[]; // Optional: Manual reviews
    downloadUrl?: string; // Optional: URL to download the digital product
  }
  

  
  export const products: Product[] = [
    {
      id: '1',
      title: 'Ultimate Fantasy World-Building Workbook',
      description: `
        Struggling to organize all your fantasy world ideas? Tired of scattered notes and forgotten details? This comprehensive and affordable ultimate fantasy worldbuilding workbook guides you through creating an immersive fantasy world, from magic systems to political intrigue, while keeping everything structured and accessible.

        ✨ EVERYTHING YOU NEED TO BUILD YOUR WORLD IN ONE BEAUTIFUL WORKBOOK ✨

        What's Included:
        - 20+ professionally designed workbook pages in PDF and DOCX formats
        - Structured sections covering all worldbuilding essentials (geography, magic, tech, culture, economy, politics, and more)
        - Flexible templates for magic systems and world maps
        - Guided prompts and storytelling techniques to spark creativity
        - Plot integration checklist to see how your world affects your plot
        - Extra pages at the end for reference images and drawings
        - Printable digital format - print at home or use digitally

        PERFECT FOR:
        - First-time fantasy writers who don't know where to start
        - Experienced novelists who want more structure
        - Authors planning a multi-book series
        - Creative writing students looking to expand their skills
        - Screenwriters wanting to build a believable world
        - Game designers creating new fantasy worlds
        - Anyone wanting to create a new world!

        This workbook is for anyone who:
        - Is looking for help on how to write a novel for their ebook or printed book
        - Feels overwhelmed by worldbuilding
        - Wants to create more believable fantasy worlds
        - Needs writing tips and help organizing their ideas
        - Values systematic development approaches
        - Aims to create deeply layered worlds
        - Wants to avoid common worldbuilding pitfalls

        THIS IS A DIGITAL DOWNLOAD:
        - No physical product will be shipped
        - Instant download available after purchase
        - Can be printed at home or used digitally
        - You'll receive one PDF and one DOCX file (please note that font/formatting changes in the docx file may occur depending on your device or version of Microsoft Word. To ensure accurate formatting, use the PDF file)

        As a thank you for supporting my shop, you'll also receive a printable collectible prompt card with your purchase <3

        PLEASE NOTE:
        Due to the digital nature of this product, no refunds can be issued after download

        Don't hesitate! Start creating your immersive world today!
       `,
      fileType: 'PDF',
      etsyUrl: "https://www.etsy.com/ca/listing/1823226554/ultimate-fantasy-world-building-workbook",
      etsyListingId: "1823226554",
      imageUrl: '/images/ultimate.jpg',
      videoUrl: '/videos/ultimate_fantasy_world.mp4', // Add your video file to public/videos/
      priceId: "price_1SmgtcFdmxVENhDuLU2v15mL",
      downloadUrl: "https://docs.google.com/document/d/1D4KGO-Uq-RuWpw9v1Mbp6HvvONvWcM8WTGG0ACT5NGU/export?format=pdf",
      reviews: [
        // Copy reviews from your Etsy listing page
        // Example format:
        // {
        //   id: "1",
        //   rating: 5,
        //   review: "This workbook is amazing! It helped me organize all my world-building ideas.",
        //   buyerName: "Sarah M.",
        //   date: "2024-12-15"
        // },
      ],
    },
    
    // {
    //   id: '5',
    //   title: 'Title',
    //   description: `description`,
    //   price: 4.99,
    //   fileType: 'PDF',
    //   etsyUrl: 'url',
    //   imageUrl: '/images/storytelling.jpg',
    // },
  ];