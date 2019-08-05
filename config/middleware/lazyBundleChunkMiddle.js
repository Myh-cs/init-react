
export class ReplaceSystemImportPlugin {

  apply(compiler){
    compiler.plugin("compilation", function(status,params) {
//
      params.normalModuleFactory.plugin("parser", function(parser, parserOptions) {
        parser.plugin("expression System", function(expr) {
          // var dep = new ConstDependency("{}", expr.range);
          // dep.loc = expr.loc;
          // this.state.current.addDependency(dep);
          // return true;
          console.log(expr)
        });
      })
    });
  }
}

export default (server,compiler,lazyFile) =>{

  compiler.apply(new ReplaceSystemImportPlugin())
}

