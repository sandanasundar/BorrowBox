// Mock API for standalone frontend prototype (without requiring Express/MongoDB backend)
// This intercepts fetch requests to http://localhost:5000/api and simulates the backend with localStorage persistence.

const initialItems = [
  {
    _id: 'item_1',
    itemName: 'Scientific Calculator',
    category: 'Study',
    description: 'Casio fx-991EX calculator, ideal for engineering mathematics and semester exams.',
    ownerName: 'Sandana',
    ownerDepartment: 'CSE',
    ownerYear: 'III',
    condition: 'Good',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    _id: 'item_2',
    itemName: 'Engineering Mathematics Book',
    category: 'Books',
    description: 'Higher Engineering Mathematics by B.S. Grewal in great condition.',
    ownerName: 'Rahul',
    ownerDepartment: 'ECE',
    ownerYear: 'II',
    condition: 'Fair',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: 'item_3',
    itemName: 'Lab Coat',
    category: 'Study',
    description: 'White cotton laboratory coat, size medium. Clean and sanitized.',
    ownerName: 'Priya',
    ownerDepartment: 'BioTech',
    ownerYear: 'I',
    condition: 'Excellent',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: 'item_4',
    itemName: 'Laptop Charger',
    category: 'Electronics',
    description: 'Universal 65W Type-C laptop power adapter compatible with Dell, Lenovo, and HP.',
    ownerName: 'Anish',
    ownerDepartment: 'IT',
    ownerYear: 'IV',
    condition: 'Good',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 24 * 1.5).toISOString()
  },
  {
    _id: 'item_5',
    itemName: 'USB Drive',
    category: 'Electronics',
    description: 'SanDisk 32GB USB 3.0 flash drive formatted for high-speed file transfers.',
    ownerName: 'Sneha',
    ownerDepartment: 'CSE',
    ownerYear: 'II',
    condition: 'Excellent',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 24 * 1.2).toISOString()
  },
  {
    _id: 'item_6',
    itemName: 'Umbrella',
    category: 'Accessories',
    description: 'Compact foldable windproof blue umbrella for rainy campus days.',
    ownerName: 'Karthik',
    ownerDepartment: 'Mech',
    ownerYear: 'III',
    condition: 'Good',
    availability: 'Borrowed',
    createdAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString()
  },
  {
    _id: 'item_7',
    itemName: 'Drawing Kit',
    category: 'Study',
    description: 'Engineering drawing kit including mini drafter, compass, set squares, and sheets container.',
    ownerName: 'Divya',
    ownerDepartment: 'Civil',
    ownerYear: 'I',
    condition: 'Good',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    _id: 'item_8',
    itemName: 'Football',
    category: 'Sports',
    description: 'Nivia size 5 football, suitable for evening college turf matches.',
    ownerName: 'Vikram',
    ownerDepartment: 'EEE',
    ownerYear: 'III',
    condition: 'Fair',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'item_9',
    itemName: 'Bluetooth Speaker',
    category: 'Electronics',
    description: 'Compact Bluetooth speaker with 6-hour battery backup for hostel study sessions.',
    ownerName: 'Sandana',
    ownerDepartment: 'CSE',
    ownerYear: 'III',
    condition: 'Excellent',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    _id: 'item_10',
    itemName: 'Arduino Kit',
    category: 'Electronics',
    description: 'Arduino Uno starter kit with jumper wires, breadboard, LEDs, and basic sensors for mini projects.',
    ownerName: 'Rohit',
    ownerDepartment: 'ECE',
    ownerYear: 'IV',
    condition: 'Good',
    availability: 'Available',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

const initialRequests = [
  {
    _id: 'req_1',
    itemId: 'item_6',
    itemName: 'Umbrella',
    borrowerName: 'Arun',
    borrowerDepartment: 'CSE',
    borrowerYear: 'II',
    requestMessage: 'Need umbrella for lab submission rain walk.',
    status: 'Approved',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    _id: 'req_2',
    itemId: 'item_1',
    itemName: 'Scientific Calculator',
    borrowerName: 'Kavya',
    borrowerDepartment: 'ECE',
    borrowerYear: 'III',
    requestMessage: 'Require scientific calculator for DSP semester test tomorrow.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  }
];

// Helper to get / set items
function getStoredItems() {
  const data = localStorage.getItem('borrowbox_items');
  if (!data) {
    localStorage.setItem('borrowbox_items', JSON.stringify(initialItems));
    return [...initialItems];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [...initialItems];
  }
}

function saveStoredItems(items) {
  localStorage.setItem('borrowbox_items', JSON.stringify(items));
}

// Helper to get / set requests
function getStoredRequests() {
  const data = localStorage.getItem('borrowbox_requests');
  if (!data) {
    localStorage.setItem('borrowbox_requests', JSON.stringify(initialRequests));
    return [...initialRequests];
  }
  try {
    return JSON.parse(data);
  } catch {
    return [...initialRequests];
  }
}

function saveStoredRequests(requests) {
  localStorage.setItem('borrowbox_requests', JSON.stringify(requests));
}

// Intercept window.fetch
const originalFetch = window.fetch;

window.fetch = async function (input, init = {}) {
  const urlString = typeof input === 'string' ? input : input?.url || '';

  // Only intercept requests directed to http://localhost:5000/api or /api
  if (urlString.includes('localhost:5000/api') || urlString.startsWith('/api')) {
    const method = (init.method || 'GET').toUpperCase();
    const url = new URL(urlString, 'http://localhost:5000');
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    // Simulate minor network latency for realistic prototype feel (100ms)
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Response creator helper
    const createResponse = (body, status = 200) => {
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    // 1. ITEMS ROUTES: /api/items
    if (pathname === '/api/items' || pathname === '/api/items/') {
      const items = getStoredItems();

      // GET /api/items
      if (method === 'GET') {
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const ownerName = searchParams.get('ownerName');

        let filtered = [...items];

        if (category && category !== 'All') {
          filtered = filtered.filter((i) => i.category.toLowerCase() === category.toLowerCase());
        }

        if (search) {
          filtered = filtered.filter((i) =>
            i.itemName.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (ownerName) {
          filtered = filtered.filter((i) =>
            i.ownerName.toLowerCase().includes(ownerName.toLowerCase())
          );
        }

        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        return createResponse(filtered, 200);
      }

      // POST /api/items
      if (method === 'POST') {
        const body = JSON.parse(init.body || '{}');
        const { itemName, category, description, ownerName, ownerDepartment, ownerYear, condition } = body;

        if (!itemName || !category || !description || !ownerName || !ownerDepartment || !ownerYear || !condition) {
          return createResponse({ message: 'All required fields must be provided' }, 400);
        }

        const newItem = {
          _id: 'item_' + Date.now() + Math.random().toString(36).substring(2, 6),
          itemName,
          category,
          description,
          ownerName,
          ownerDepartment,
          ownerYear,
          condition,
          availability: 'Available',
          createdAt: new Date().toISOString()
        };

        const updatedItems = [newItem, ...items];
        saveStoredItems(updatedItems);

        return createResponse({ message: 'Item listed successfully', item: newItem }, 201);
      }
    }

    // 2. SINGLE ITEM ROUTES: /api/items/:id
    const itemMatch = pathname.match(/^\/api\/items\/([^/]+)$/);
    if (itemMatch) {
      const itemId = itemMatch[1];
      const items = getStoredItems();

      // GET /api/items/:id
      if (method === 'GET') {
        const item = items.find((i) => i._id === itemId);
        if (!item) {
          return createResponse({ message: 'Item not found' }, 404);
        }
        return createResponse(item, 200);
      }

      // PUT /api/items/:id
      if (method === 'PUT') {
        const updateData = JSON.parse(init.body || '{}');
        const index = items.findIndex((i) => i._id === itemId);
        if (index === -1) {
          return createResponse({ message: 'Item not found' }, 404);
        }

        items[index] = { ...items[index], ...updateData, _id: itemId };
        saveStoredItems(items);

        return createResponse({ message: 'Item updated successfully', item: items[index] }, 200);
      }

      // DELETE /api/items/:id
      if (method === 'DELETE') {
        const index = items.findIndex((i) => i._id === itemId);
        if (index === -1) {
          return createResponse({ message: 'Item not found' }, 404);
        }

        const updatedItems = items.filter((i) => i._id !== itemId);
        saveStoredItems(updatedItems);

        // Delete associated requests
        const requests = getStoredRequests();
        const updatedRequests = requests.filter((r) => r.itemId !== itemId);
        saveStoredRequests(updatedRequests);

        return createResponse({ message: 'Item deleted successfully' }, 200);
      }
    }

    // 3. REQUESTS ROUTES: /api/requests
    if (pathname === '/api/requests' || pathname === '/api/requests/') {
      const requests = getStoredRequests();

      // GET /api/requests
      if (method === 'GET') {
        const sorted = [...requests].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        return createResponse(sorted, 200);
      }

      // POST /api/requests
      if (method === 'POST') {
        const body = JSON.parse(init.body || '{}');
        const { itemId, itemName, borrowerName, borrowerDepartment, borrowerYear, requestMessage } = body;

        if (!itemId || !itemName || !borrowerName || !borrowerDepartment || !borrowerYear || !requestMessage) {
          return createResponse({ message: 'All request fields are required' }, 400);
        }

        const items = getStoredItems();
        const item = items.find((i) => i._id === itemId);
        if (!item) {
          return createResponse({ message: 'Target item not found' }, 404);
        }

        const newRequest = {
          _id: 'req_' + Date.now() + Math.random().toString(36).substring(2, 6),
          itemId,
          itemName,
          borrowerName,
          borrowerDepartment,
          borrowerYear,
          requestMessage,
          status: 'Pending',
          createdAt: new Date().toISOString()
        };

        const updatedRequests = [newRequest, ...requests];
        saveStoredRequests(updatedRequests);

        return createResponse({ message: 'Borrow request submitted successfully', request: newRequest }, 201);
      }
    }

    // 4. SINGLE REQUEST ROUTES: /api/requests/:id
    const requestMatch = pathname.match(/^\/api\/requests\/([^/]+)$/);
    if (requestMatch) {
      const requestId = requestMatch[1];
      const requests = getStoredRequests();

      // PUT /api/requests/:id
      if (method === 'PUT') {
        const { status } = JSON.parse(init.body || '{}');
        if (!['Pending', 'Approved', 'Rejected', 'Returned'].includes(status)) {
          return createResponse({ message: 'Invalid status value' }, 400);
        }

        const index = requests.findIndex((r) => r._id === requestId);
        if (index === -1) {
          return createResponse({ message: 'Borrow request not found' }, 404);
        }

        requests[index].status = status;
        saveStoredRequests(requests);

        // Synchronize with Item availability:
        // If Approved -> set item availability to 'Borrowed'
        // If Returned -> set item availability to 'Available'
        const items = getStoredItems();
        const itemIndex = items.findIndex((i) => i._id === requests[index].itemId);
        if (itemIndex !== -1) {
          if (status === 'Approved') {
            items[itemIndex].availability = 'Borrowed';
            saveStoredItems(items);
          } else if (status === 'Returned') {
            items[itemIndex].availability = 'Available';
            saveStoredItems(items);
          }
        }

        return createResponse({ message: `Request updated to ${status}`, request: requests[index] }, 200);
      }

      // DELETE /api/requests/:id
      if (method === 'DELETE') {
        const index = requests.findIndex((r) => r._id === requestId);
        if (index === -1) {
          return createResponse({ message: 'Borrow request not found' }, 404);
        }

        const updatedRequests = requests.filter((r) => r._id !== requestId);
        saveStoredRequests(updatedRequests);

        return createResponse({ message: 'Borrow request deleted successfully' }, 200);
      }
    }
  }

  // Fallback to real fetch
  return originalFetch.apply(this, [input, init]);
};

console.log('[BorrowBox Prototype] Mock API layer initialized for standalone mode.');
