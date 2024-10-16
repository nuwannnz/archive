import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { v4 as uuidv4 } from 'uuid'
import { DomainModal } from '../modals/domain.modal.js'
import { logger } from '../utils/logger.js'

const sqsClient = new SQSClient({})

export const sendContactEmail = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const domain = await DomainModal.findOne({
      _id: req.params.id,
      isActive: true
    })
    if (!domain) {
      return res.status(404).json({ message: 'Invalid Domain' })
    }
    const { messageBody } = req.body

    const command = new SendMessageCommand({
      QueueUrl: process.env.NOTIFICATION_MODULE_SQS_QUEUE,
      MessageAttributes: {
        To: {
          DataType: 'String',
          StringValue: domain.email
        },
        From: {
          DataType: 'String',
          StringValue: process.env.CONTACT_US_SENDER_EMAIL
        },
        Subject: {
          DataType: 'String',
          StringValue: process.env.CONTACT_US_SUBJECT
        }
      },
      MessageBody: messageBody,
      MessageGroupId: process.env.CONTACT_US_MESSAGE_GROUP_ID,
      MessageDeduplicationId: uuidv4()
    })

    await sqsClient.send(command)

    return res.status(200).json({ message: 'Request was successful.' })
  } catch (error) {
    logger.error(`Error Sending Email Request: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Create a new domain
export const createDomain = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    if (req.userEmail === 'diliru@decimalapps.com' || req.userEmail === 'nuwan@decimalapps.com') {
      const newDomain = await DomainModal.create(req.body)
      logger.info(`Domain created with id: ${newDomain._id}`)
      return res.json(newDomain)
    } else {
      return res.status(401).json({ message: 'User does not have permission to create a domain' })
    }
  } catch (error) {
    logger.error(`Error creating domain: ${error}`)
    res.status(500).json({ error: error.message })
  }
}

// Get all domains
export const getAllDomains = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const domains = await DomainModal.find().where({ isActive: true })
    return res.json(domains)
  } catch (error) {
    logger.error(`Error fetching domains: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Get a single domain by ID
export const getDomainById = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const domain = await DomainModal.findOne({
      _id: req.params.id,
      isActive: true
    })
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' })
    }
    return res.json(domain)
  } catch (error) {
    logger.error(`Error fetching domain: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Get a single domain by Token
export const getDomainByToken = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)
    const domain = await DomainModal.findOne({
      _id: req.customDomainId,
      isActive: true
    })
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' })
    }
    return res.json(domain)
  } catch (error) {
    logger.error(`Error fetching domain: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Update a domain
export const updateDomain = async (req, res) => {
  try {
    logger.info(`Request: ${req}`)

    const updateData = {}
    for (const key in req.body) {
      updateData[key] = req.body[key]
    }

    const updatedDomain = await DomainModal.findOneAndUpdate(
      { _id: req.customDomainId, isActive: true },
      updateData,
      { new: true }
    )

    if (!updatedDomain) {
      return res.status(404).json({ message: 'Domain not found' })
    }

    return res.json(updatedDomain)
  } catch (error) {
    logger.error(`Error updating domain: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}

// Delete a domain
export const deleteDomain = async (req, res) => {
  try {
    logger.info(`Request: ${req.userEmail}`)
    if (req.userEmail === 'diliru@decimalapps.com' || req.userEmail === 'nuwan@decimalapps.com') {
      const deletedDomain = await DomainModal
        .findOneAndUpdate({ _id: req.params.id }, { isActive: false })
      if (!deletedDomain) {
        return res.status(404).json({ message: 'Domain not found' })
      }
      return res.status(204).send()
    } else {
      return res.status(401).json({ message: 'User does not have permission to delete the domain' })
    }
  } catch (error) {
    logger.error(`Error deleting domain: ${error}`)
    return res.status(500).json({ error: error.message })
  }
}
