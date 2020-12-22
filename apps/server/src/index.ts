import { resolve, normalize, join } from 'path'
import { createServer, RequestListener} from 'http'
import { readFile } from 'fs' 

const webAppBasePath = '../web_app';

const handleWebApp: RequestListener = (req, res) => {
    var resolvedBase = resolve(__dirname ,webAppBasePath);
    var safeSuffix = normalize(req.url || '')
        .replace(/^(\.\.[\/\\])+/, '');
    var fileLocation = join(resolvedBase, safeSuffix);
    
    readFile(fileLocation, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
        
        res.statusCode = 200;

        res.write(data);
        return res.end();
    });

};

const httpSerever = createServer(handleWebApp)


httpSerever.listen("5000", () => {
    console.info('Listen on 5000 port')
})
