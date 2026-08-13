export const transactions = [
  {
    id: "tx-1",
    type: "payment",
    merchant: "Starbucks",
    reference: "STARBUCKS #3847",
    amount: -5.47,
    date: "2026-08-13",
    time: "11:35 PM",
    status: "Completed",
    category: "Food & Drink"
  },
  {
    id: "tx-2",
    type: "payment",
    merchant: "Sweetgreen",
    reference: "SWEETGREEN #1042",
    amount: -13.85,
    date: "2026-08-13",
    time: "5:08 PM",
    status: "Completed",
    category: "Food & Drink"
  },
  {
    id: "tx-3",
    type: "deposit",
    merchant: "Direct Deposit - Payroll",
    reference: "GUSTO PAYROLL",
    amount: 987.54,
    date: "2026-08-12",
    time: "7:53 PM",
    status: "Completed",
    category: "Income"
  },
  {
    id: "tx-4",
    type: "payment",
    merchant: "Kroger Groceries",
    reference: "KROGER #412",
    amount: -63.18,
    date: "2026-08-12",
    time: "11:31 AM",
    status: "Completed",
    category: "Groceries"
  },
  {
    id: "tx-5",
    type: "withdrawal",
    merchant: "ATM Withdrawal",
    reference: "ATM #98231",
    amount: -200.00,
    date: "2026-08-11",
    time: "3:45 PM",
    status: "Completed",
    category: "Cash"
  },
  {
    id: "tx-6",
    type: "transfer",
    merchant: "Transfer to Savings",
    reference: "INTERNAL TRANSFER",
    amount: -500.00,
    date: "2026-08-11",
    time: "10:00 AM",
    status: "Completed",
    category: "Transfer"
  },
  {
    id: "tx-7",
    type: "payment",
    merchant: "Netflix",
    reference: "NETFLIX.COM",
    amount: -15.99,
    date: "2026-08-10",
    time: "12:00 AM",
    status: "Completed",
    category: "Entertainment"
  },
  {
    id: "tx-8",
    type: "deposit",
    merchant: "Mobile Deposit",
    reference: "CHECK #0012",
    amount: 250.00,
    date: "2026-08-10",
    time: "9:14 AM",
    status: "Completed",
    category: "Income"
  }
];

export const receipts = [
  {
    id: "r-1",
    category: "ATM Receipt",
    merchant: "Chase ATM",
    date: "2026-08-11",
    time: "3:45 PM",
    amount: 200.00,
    method: "Debit Card",
    txId: "ATM-2026081198231",
    status: "Completed"
  },
  {
    id: "r-2",
    category: "Bank Statement",
    merchant: "Navi Bank",
    date: "2026-08-01",
    time: "12:00 AM",
    amount: null,
    method: "N/A",
    txId: "STMT-202608",
    status: "Generated"
  }
];
