const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const TEMPLATES_DIR = path.join(os.homedir(), '.neutralino', 'templates');

const ensureTemplateDir = async () =>{
    if(!fs.existsSync(TEMPLATES_DIR)){
       await fs.mkdirp(TEMPLATES_DIR);
    }
 }
module.exports = 
   {
    command: 'template <action> [templateName]',
    register: (command, modules) => {
      command
       .option('-t --template <templateName>')
       .action(async (action, templateName, options) => {
         try{
         switch(action){
            case 'save':
                  try {
                      await ensureTemplateDir();
                    } catch (error) {
                      console.error('Error initializing templates directory:', error.message);
                      process.exit(1);
                  }
                  if(!templateName){
                     throw new Error(`Template name is required for saving. Usage: neu template save <templateName>`);
                  }
                  const savePath = path.join(TEMPLATES_DIR, templateName);
                  if(fs.existsSync(savePath)){
                     throw new Error(`Template "${templateName}" already exist`);
                  }
                  console.log(`Saving template ${templateName} at path ${savePath}`);
                  await fs.copy(process.cwd(), savePath);
                  console.log(`Template "${templateName}" succesfully saved`);

               break;

            case 'list':
                if(!fs.existsSync(TEMPLATES_DIR)){
                  throw new Error(`You don't have any saved templates`);
                }
                const templates = await fs.readdir(TEMPLATES_DIR);
                console.log(`Available templates:`, templates.length ? templates.join(', ') : 'None');

               break;

            case 'remove':
               if(!templateName){
                  throw new Error(`Template name is required for removing. Usage: neu template remove <templateName>`);
               }
                const removePath = path.join(TEMPLATES_DIR, templateName);
                if(!fs.existsSync(removePath)){
                    throw new Error(`Template "${templateName}" does not exist`);
                }
                await fs.remove(removePath);
                 console.log(`Template "${templateName}" removed successfully`);

               break;

            case 'create':
               if(!templateName){
                  throw new Error(`Project name is required for creation. Usage: neu template create <projectName> -t <templateName>`);
               }
               const projectName = templateName;
               const { template: selectedTemplateName } = options;
               if(!selectedTemplateName){
                  throw new Error(`Template name is required. Use the "-t" or "--template" flag to specify a template.`);
               }
               const templatePath = path.join(TEMPLATES_DIR, selectedTemplateName);
               if(!fs.existsSync(templatePath)){
                  throw new Error(`Template "${selectedTemplateName}" does not exists`);
               }
               const projectPath = path.join(process.cwd(), projectName);
               if(fs.existsSync(projectPath)){
                   throw new Error(`Project "${projectName}" already exists.`);
               }
               await fs.copy(templatePath, projectPath);
               console.log(`Project "${projectName}" created successfully from template "${selectedTemplateName}".`);

            break;

            default:
               console.log(`Unknown action "${action}". Supported actions: save, list, remove, create.`);
         }
         }catch(err){
            console.log(err.message);
         } 
       });
}}
