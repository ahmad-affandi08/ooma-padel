import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Data Menu Lengkap dari PDF OOMA
const menuData = [
  {
    categoryName: 'Kitchen',
    categorySlug: 'kitchen',
    order: 1,
    items: [
      {
        name: 'Nasi Sei Sapi Sambal Matah',
        price: 37000,
        description: 'Sei sapi asap khas NTT dengan aroma smoky yang lembut, disajikan bersama nasi hangat dan sambal matah segar berbumbu bawang, serai, dan jeruk limau.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Iga Bakar Maranggi',
        price: 45000,
        description: 'Iga sapi pilihan dimarinasi bumbu maranggi khas Priangan, dibakar hingga juicy dan harum asap, disajikan bersama nasi hangat, sambal kecap segar, serta lalapan.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Sup Iga',
        price: 45000,
        description: 'Sup iga sapi dengan kuah bening yang gurih dan hangat, disajikan bersama nasi putih, sayuran segar, dan taburan bawang goreng.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Rawon Iga',
        price: 45000,
        description: 'Rawon khas Jawa Timur dengan kuah hitam kluwek yang kaya rasa, menggunakan iga sapi empuk yang direbus lama hingga lembut, disajikan dengan tauge segar dan kerupuk.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Ayam Pop',
        price: 40000,
        description: 'Ayam pop khas Minang yang dimasak dengan bumbu ringan namun kaya rasa, tekstur lembut, disajikan dengan nasi putih hangat, sambal lado tomat, dan sayuran.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Sate Lilit Bali',
        price: 25000,
        description: 'Olahan daging yang dibumbui rempah khas Bali, dililit pada serai lalu dipanggang hingga harum, disajikan dengan sambal matah.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Goreng Genep Sei Sapi',
        price: 43000,
        description: 'Nasi goreng dengan bumbu genep Bali yang kaya akan rempah, dipadu dengan daging sapi asap yang gurih dan harum.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Ayam Bakar Taliwang',
        price: 43000,
        description: 'Ayam bakar khas Lombok dengan bumbu pedas merah yang meresap, dibakar hingga harum dan juicy, disajikan dengan plecing dan sambal khas.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Sate Jimbaran',
        price: 30000,
        description: 'Sate ayam khas pesisir Jimbaran dengan bumbu oles manis-gurih dan aroma bakaran yang harum.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Udang Butter Sarang Telur',
        price: 25000,
        description: 'Udang goreng yang renyah dan juicy, dipadu telur kocok yang membalut lembut seperti sarang, disajikan bersama nasi hangat dan saus gurih.',
        isChefRec: false,
        isSpicy: false,
      },
      {
        name: 'Nasi Ayam Lengkuas',
        price: 30000,
        description: 'Ayam goreng berbumbu lengkuas yang kaya aroma dan renyah pada taburannya, disajikan dengan sambal pilihan.',
        isChefRec: true,
        isSpicy: true,
      },
      {
        name: 'Nasi Ayam Katsu Curry',
        price: 25000,
        description: 'Ayam fillet dibalut tepung renyah khas Jepang, digoreng keemasan, disajikan dengan saus katsu curry.',
        isChefRec: true,
        isSpicy: false,
      },
      {
        name: 'Nasi Ayam Katsu Teriyaki',
        price: 25000,
        description: 'Ayam fillet dibalut tepung renyah khas Jepang disajikan dengan saus teriyaki gurih manis.',
        isChefRec: false,
        isSpicy: false,
      },
    ],
  },
  {
    categoryName: 'Coffee',
    categorySlug: 'coffee',
    order: 2,
    items: [
      { name: 'Japanese Blend', price: 18000, description: 'Racikan kopi blend yang diseduh Japanese style atau dropp ice.' },
      { name: 'Kopi Bandrek', price: 18000, description: 'Racikan kopi dipadukan dengan rempah (ginger, cloves, cinnamon, lemongrass).' },
      { name: 'Kopi Jejak', price: 20000, description: 'Racikan kopi dipadukan dengan bahan herbal segar (ginger, lemongrass, kencur, lemon).' },
      { name: 'OOMA\'s Kopsuren', price: 20000, description: 'Racikan kopi susu gula aren khas OOMA.', isChefRec: true },
      { name: 'Americano', price: 18000, description: 'Espresso klasik dengan air panas.' },
      { name: 'Cappucino', price: 22000, description: 'Espresso dengan steamed milk dan foam.' },
      { name: 'Coffee Latte', price: 22000, description: 'Espresso dengan susu yang lembut.' },
      { name: 'Magic Coffee', price: 25000, description: 'Racikan kopi spesial OOMA.' },
      { name: 'Coffee Cranberrys', price: 25000, description: 'Racikan moktail coffee, perpaduan cold brew dan jus cranberry.' },
      { name: 'Dirty Latte', price: 25000, description: 'Espresso shot di atas susu dingin.' },
      { name: 'Coffee Botanical', price: 25000, description: 'Perpaduan cold brew coffee, soda botanical, dan orange juice.' },
    ],
  },
  {
    categoryName: 'Tea',
    categorySlug: 'tea',
    order: 3,
    items: [
      { name: 'Tea', price: 8000, description: 'Teh klasik hangat atau dingin.' },
      { name: 'Lychee Tea', price: 16000, description: 'Teh dengan aroma leci segar.' },
      { name: 'Peach Tea', price: 16000, description: 'Teh dengan rasa peach manis.' },
      { name: 'Cinnamon Tea', price: 16000, description: 'Teh dengan sentuhan kayu manis hangat.' },
    ],
  },
  {
    categoryName: 'Milkshake',
    categorySlug: 'milkshake',
    order: 4,
    items: [
      { name: 'Oreo Milkshake', price: 16000, description: 'Milkshake dengan remahan oreo.' },
      { name: 'Choco Milkshake', price: 16000, description: 'Milkshake cokelat klasik.' },
      { name: 'Strawberry Milkshake', price: 16000, description: 'Milkshake strawberry segar.' },
    ],
  },
  {
    categoryName: 'Smoothie',
    categorySlug: 'smoothie',
    order: 5,
    items: [
      { name: 'OOMA\'s Smoothie', price: 28000, description: 'Smoothie spesial racikan OOMA.', isChefRec: true },
      { name: 'Dragon Fruit Smoothie', price: 22000, description: 'Smoothie buah naga segar.' },
      { name: 'Banana Smoothie', price: 22000, description: 'Smoothie pisang creamy.' },
      { name: 'Mango Smoothie', price: 22000, description: 'Smoothie mangga manis.' },
    ],
  },
  {
    categoryName: 'Matcha & Latte',
    categorySlug: 'latte',
    order: 6,
    items: [
      { name: 'Redvelvet Latte', price: 20000, description: 'Latte dengan rasa red velvet.' },
      { name: 'Matcha Latte', price: 20000, description: 'Latte matcha Jepang premium.' },
      { name: 'Choco Latte', price: 20000, description: 'Latte cokelat hangat.' },
      { name: 'Strawberry Coconut Cloud', price: 25000, description: 'Perpaduan strawberry dan kelapa.' },
      { name: 'Matcha Coconut Cloud', price: 25000, description: 'Perpaduan matcha dan kelapa.' },
    ],
  },
  {
    categoryName: 'Freshness Juice',
    categorySlug: 'juice',
    order: 7,
    items: [
      { name: 'Watermelon Juice', price: 20000, description: 'Jus semangka segar.' },
      { name: 'Virgin Mojito', price: 22000, description: 'Mojito non-alkohol dengan mint segar.' },
      { name: 'Lychee Mojito', price: 22000, description: 'Mojito dengan rasa leci.' },
      { name: 'Peach Mojito', price: 22000, description: 'Mojito dengan rasa peach.' },
      { name: 'Strawberry Mojito', price: 22000, description: 'Mojito dengan strawberry segar.' },
      { name: 'Cucumber Mojito', price: 22000, description: 'Mojito dengan timun segar.' },
      { name: 'Pineapple Juice', price: 20000, description: 'Jus nanas segar.' },
      { name: 'Orange Juice', price: 20000, description: 'Jus jeruk segar.' },
      { name: 'Melon Juice', price: 20000, description: 'Jus melon manis.' },
    ],
  },
  {
    categoryName: 'Snacks',
    categorySlug: 'snacks',
    order: 8,
    items: [
      { name: 'Tahu Walik', price: 18000, description: 'Tahu goreng isi sayuran.' },
      { name: 'Pisang Goreng Madu', price: 15000, description: 'Pisang goreng dengan siraman madu.' },
      { name: 'Tempe Mendoan', price: 15000, description: 'Tempe goreng tepung khas Jawa.' },
      { name: 'Platter Nusantara', price: 26000, description: 'Kombinasi snack nusantara.' },
    ],
  },
  {
    categoryName: 'Breads & Cakes',
    categorySlug: 'breads',
    order: 9,
    items: [
      { name: 'Donut Original', price: 8000, description: 'Donut klasik tanpa topping.' },
      { name: 'Donut Glaze Tiramisu', price: 10000, description: 'Donut dengan glaze tiramisu.' },
      { name: 'Donut Glaze Matcha', price: 10000, description: 'Donut dengan glaze matcha.' },
      { name: 'Donut Glaze Strawberry', price: 10000, description: 'Donut dengan glaze strawberry.' },
      { name: 'Donut Glaze Chocolate', price: 10000, description: 'Donut dengan glaze cokelat.' },
      { name: 'Coffee Butter Bread', price: 10000, description: 'Roti butter dengan aroma kopi.' },
      { name: 'Salt Bread', price: 15000, description: 'Roti asin Jepang.' },
      { name: 'Salt Bread Egg Mayo', price: 18000, description: 'Salt bread dengan telur mayo.' },
      { name: 'Salt Bread Smoke Beef & Cheese', price: 18000, description: 'Salt bread dengan smoke beef dan keju.' },
      { name: 'Salt Bread Garlic Butter Cheese', price: 18000, description: 'Salt bread dengan garlic butter dan keju.' },
      { name: 'Cinnamon Roll', price: 18000, description: 'Roti gulung kayu manis.' },
      { name: 'Salted Caramel Cheese Cake', price: 40000, description: 'Cheese cake dengan salted caramel.' },
      { name: 'Strawberry Cheese Cake', price: 45000, description: 'Cheese cake dengan strawberry segar.' },
      { name: 'Lotus Cheese Cake', price: 45000, description: 'Cheese cake dengan lotus biscoff.' },
      { name: 'Banana Breads', price: 25000, description: 'Roti pisang homemade.' },
      { name: 'Pumpkins Breads', price: 25000, description: 'Roti labu homemade.' },
    ],
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ooma.com' },
    update: {},
    create: {
      email: 'admin@ooma.com',
      name: 'Admin OOMA',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create categories and menu items
  for (const category of menuData) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.categorySlug },
      update: { name: category.categoryName, order: category.order },
      create: {
        name: category.categoryName,
        slug: category.categorySlug,
        order: category.order,
      },
    })

    console.log(`✅ Category created: ${createdCategory.name}`)

    // Create menu items for this category
    for (const item of category.items) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          price: item.price,
          description: item.description || null,
          isChefRec: item.isChefRec || false,
          isSpicy: item.isSpicy || false,
          categoryId: createdCategory.id,
          isAvailable: true,
          imageUrl: null, // Can be updated later with actual images
        },
      })
    }

    console.log(`   ↳ Added ${category.items.length} items to ${createdCategory.name}`)
  }

  // Create sample courts
  const courts = await Promise.all([
    prisma.court.upsert({
      where: { id: 'court-1' },
      update: {},
      create: {
        id: 'court-1',
        name: 'Court 1',
        pricePerHour: 150000,
        isActive: true,
      },
    }),
    prisma.court.upsert({
      where: { id: 'court-2' },
      update: {},
      create: {
        id: 'court-2',
        name: 'Court 2',
        pricePerHour: 150000,
        isActive: true,
      },
    }),
  ])

  console.log('✅ Courts created:', courts.length)

  console.log('🎉 Database seed completed!')
  console.log(`
📊 Summary:
- Admin User: 1
- Categories: ${menuData.length}
- Menu Items: ${menuData.reduce((sum, cat) => sum + cat.items.length, 0)}
- Courts: ${courts.length}
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
