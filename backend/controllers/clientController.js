const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({ orderBy: { created_at: 'desc' } });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

const getClientById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client' });
  }
};

const createClient = async (req, res) => {
  const { name, email, account_number, balance, status } = req.body;

  if (!name || !email || !account_number) {
    return res.status(400).json({ error: 'name, email, and account_number are required' });
  }

  try {
    const client = await prisma.client.create({
      data: { name, email, account_number, balance: balance ?? 0, status: status || 'active' },
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client' });
  }
};

const updateClient = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, account_number, balance, status } = req.body;

  try {
    const client = await prisma.client.update({
      where: { id },
      data: { name, email, account_number, balance, status },
    });
    res.json(client);
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Client not found' });
    res.status(500).json({ error: 'Failed to update client' });
  }
};

const deleteClient = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.client.delete({ where: { id } });
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ error: 'Client not found' });
    res.status(500).json({ error: 'Failed to delete client' });
  }
};

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
