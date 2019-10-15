// import React, { Component } from "react";
// import ErrorBoundary from "../views/errorboundary";
// import ajax from '../views/index';
// import "../public/create.css";

// class NewRecipe extends Component {
//   constructor(props) {
//     super(props);
//     this.resetForm  = this.resetForm.bind(this);
//     this.submitForm = this.submitForm.bind(this);
//     this.nameHandler= this.nameHandler.bind(this);
//     this.ingredientsHandler= this.ingredientsHandler.bind(this);
//     this.directionsHandler = this.directionsHandler.bind(this);
    
//     this.state = {
//       name: "",
//       ingredients: "",
//       directions : ""
//     };
//   }
  
//   componentDidMount() {}

//   componentWillUnMount() {}
  
//   resetForm() {
//     this.setState({
//       name: "",
//       ingredients: "",
//       directions: ""
//     });
//   }

//   submitForm() {
    
//     ajax.ready(ajax.request('POST', '/createRecipe', this.state, (data) => {
//       this.setState({
//         name: '',
//         directions:'',
//         ingredients: ''
//       });     
//     }));
//   }  
  
//   nameHandler(evt) {    
//     this.setState({
//       name : evt.target.value
//     });
//   }
  
//   ingredientsHandler(evt) {
//     this.setState({
//       ingredients : evt.target.value
//     });
//   }
  
//   directionsHandler(evt) {
//     this.setState({
//       directions : evt.target.value
//     });
//   }
  
//   render() {   
//     return (
//       <ErrorBoundary>
//         <div id="subframe-mount">
//           <div 
//             id="subframe" 
//             className="frame radius">
//             <header 
//               id="subframe-header" 
//               className="ua-header">
//               <h3>New Recipe</h3>
//               <i
//                 id="account-close"
//                 className="fas fa-window-close"
//                 title="close"
//                 onClick={this.props.userLogin}
//               />
//             </header>
//             <form name="newRecipeForm">
//               <div className="flex-container radius">
//                 <header className="ua-header headr">
//                   <h3>Name</h3>
//                 </header>
//                 <input 
//                   id="name" 
//                   name='name' 
//                   value={this.state.name} 
//                   onChange={this.nameHandler} required />        
//               </div>
//               <div className="flex-container radius">
//                 <header className="ua-header headr">
//                   <h3>Ingredients</h3>
//                 </header>
//                 <textarea 
//                   id="ingredients" 
//                   name='ingredients' 
//                   value={this.state.ingredients} 
//                   onChange={this.ingredientsHandler}
//                   rows="2"
//                   required/>        
//               </div>
//               <div className="flex-container radius">
//                 <header className="ua-header headr">
//                   <h3>Directions</h3>
//                 </header>
//                 <textarea 
//                   id="directions" 
//                   name='directions' 
//                   value={this.state.directions} 
//                   rows='2'
//                   onChange={this.directionsHandler} required/>        
//               </div> 
//               <div id='bttn-div'>
//                 <input 
//                   id='save' 
//                   value='Save' 
//                   type='button' 
//                   onClick={this.submitForm}/>
//                 <input
//                   id='reset'
//                   value='Reset'
//                   type='button'
//                   onClick={this.resetForm} />
//               </div>
//             </form>           
//           </div>         
//         </div>
//       </ErrorBoundary>
//     );
//   }
// }

// export default NewRecipe;
