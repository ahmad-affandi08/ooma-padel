import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Testing Order Creation...')

  try {
    // 1. Fetch a menu item to reference
    const item = await prisma.menuItem.findFirst()
    if (!item) {
      console.error('No menu item found to test with!')
      return
    }
    console.log('Found Item:', item.name, item.id)

    // 2. Create Order
    const order = await prisma.order.create({
      data: {
        orderNumber: `TEST-${Date.now()}`,
        subtotal: item.price,
        tax: Math.round(item.price * 0.1),
        total: Math.round(item.price * 1.1),
        paymentMethod: 'CASH', // Enum check
        status: 'COMPLETED',
        customerName: 'Test Script',
        items: {
          create: [
            {
              menuItemId: item.id,
              quantity: 1,
              price: item.price,
              notes: 'Debug note'
            }
          ]
        }
      }
    })

    console.log('✅ Order Created Successfully:', order.id)
  } catch (e) {
    console.error('❌ Failed to create order:')
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
