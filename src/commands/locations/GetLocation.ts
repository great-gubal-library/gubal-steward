import { Message, MessageEmbed } from 'discord.js';
import { AxiosResponse } from 'axios';
import { ILocation } from 'src/types/Location';
import * as api from '../../services/api';

export const GetLocation = {
  name: "location",
  description: "Fetch details of a single location",
  execute: async (message: Message, args: string[]) => {
    const locationId = parseInt(args[0], 10);
    try {
      const { data: location }: AxiosResponse<ILocation> = await api.fetchSingleLocation(locationId);

      const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Location details')
        // .setAuthor('Gubal Steward', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
          { name: 'Name', value: location.name },
          { name: 'In-game location', value: location.inGameLocation },
          { name: 'Owner', value: location.owner },
          { name: 'Description', value: location.description },
          { name: 'External link', value: location.externalLink },
          { name: 'Tags', value: location.tags },
          { name: 'Server', value: location.server, inline: true },
          { name: 'Data center', value: location.datacenter, inline: true },
        )
        // .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('P.S. hey ur cute', 'https://i.imgur.com/wSTFkRM.png');

      message.channel.send(exampleEmbed);
    } catch (error) {
      console.log("LOCATION ERROR", error);
      message.channel.send("Sorry, couldn't find that location.");
    }
  },
};
