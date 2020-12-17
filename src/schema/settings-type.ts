import { gql, IResolvers } from 'apollo-server'
import { getConnection, getRepository } from "typeorm";
import { Setting as SettingEntity } from '../entity/Setting'

export const settingsType = gql`

  type Setting {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
    value: String
  }
  
  type CreateNewSettingResponse {
    setting: Setting!
  }
  
  input SettingInput {
    name: String!
    value: String!
  }
  
  type Query {
    getAllSettings: [Setting]
    getSetting(id: ID): Setting
    getRandomSetting: Setting
  }
  
  type Mutation {
    createNewSetting(setting: SettingInput): CreateNewSettingResponse!
    updateSetting(id: ID, setting: SettingInput): Setting
  }
`

export interface CreateNewSetting {
  name: string,
  value: string,
  createdAt: Date,
}

export interface Setting {
  id: string,
  name: string,
  value: string,
  createdAt: Date,
  updatedAt?: Date,
}

export const settingsResolvers: IResolvers = {
  Query: {
    getAllSettings: async (obj, args, context) => {
      const connection = getConnection()
      const allSettings: Setting[] | null = await connection.query('SELECT * FROM setting')
      return allSettings
    },
    getSetting: async (obj, { id }, context) => {
      const settingRepository: any = getRepository(SettingEntity)
      const result: Setting | null = await settingRepository.findOne(id)
      return result
    },
    getRandomSetting: async (obj, args, context) => {
      const connection = getConnection()
      const allSettings: Setting[] | [] = await connection.query('SELECT * FROM setting')
      const randomIndex = Math.floor(Math.random() * allSettings.length)
      console.log('here is the length of allSetttings', allSettings.length)
      console.log('here is the random number', randomIndex)
      return allSettings[randomIndex]
    },
  },
  Mutation: {
    createNewSetting: async (obj, { setting: { value, name } }, context) => {
      const settingRepository: any = getRepository(SettingEntity)
      const newSetting: CreateNewSetting = {
        value,
        name,
        createdAt: new Date(),
      }
      const result = await settingRepository.save(newSetting)
      return { setting: result }
    },
    updateSetting: async (obj, { id, setting: { value, name } }, context) => {
      const connection = getConnection()
      await connection.createQueryBuilder()
        .update(SettingEntity)
        .set({ name, value, updatedAt: new Date() })
        .where("id = :id", { id })
        .execute();
      const [updatedSetting] = await connection.query('SELECT * FROM setting WHERE id = $1', [id])
      return updatedSetting
    },
  },
}