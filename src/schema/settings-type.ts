import { gql, IResolvers } from 'apollo-server'
import { getConnection, getRepository } from "typeorm";
import { Setting as SettingEntity } from '../entity/Setting'

export const settingsType = gql`

  type Setting {
    id: ID
    name: String
    createdAt: String
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
  }
  
  type Mutation {
    createNewSetting(setting: SettingInput): CreateNewSettingResponse!
  }
`

export interface Setting {
  id?: string,
  name?: string,
  value: string,
  createdAt: Date,
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
    }
  },
  Mutation: {
    createNewSetting: async (obj, { setting: { value, name } }, context) => {
      const settingRepository: any = getRepository(SettingEntity)
      const newSetting: Setting = {
        value,
        name,
        createdAt: new Date(),
      }
      const result = await settingRepository.save(newSetting)
      return { setting: result }
    }
  },
}