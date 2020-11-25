import React, { Component, Fragment, useState} from 'react';
import { Form, Button,Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import "./PlanIntervencion.scss";
import { faUserCircle,faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {urlServerAPI} from "../../../config/config";
import axios from 'axios';
import moment from 'moment';
import {Collapse} from 'react-collapse';


interface IIngresoState {
	casa: any;
	nombre: any;
	cama: any;
	interventores:any;
	interventores2:any;
	fecha_nac:any;
	prestaciones:any;
	objetivos:any;
	prestacion:number;
	interventor:number;
	interventor2:number;
	objetivo:number;
	objetivo2:number;
	prestacion2:number;
	calle:any;
	nro_casa:any;
	ciudad:any;
	comuna:any;
	collapse:any;
	text:any;
}

export class PlanIntervencion extends Component<{}, IIngresoState> {
	constructor(props:any) {
	    super(props)
	    this.state = {
			casa: "",
			nombre: "",
			cama:"",
			interventores:[],
			interventores2:[],
			fecha_nac:"",
			prestaciones:[],
			objetivos:[],
			prestacion : null,
			objetivo : null,
			prestacion2 : null,
			objetivo2 : null,
			interventor : null,
			interventor2 : null,
			ciudad: "",
			comuna: "",
			calle:"",
			nro_casa:"",
			collapse: false,
			text: "+"
		};
  		this.toggle = this.toggle.bind(this);
	}


	toggle (evt:any) {
		this.setState(state => {
      		return { 
      			...state,
      			collapse : this.state.collapse == false ? true : false,
      			text : this.state.text == "+" ? "-" : "+"
       		};
    		});
	}
	

	initialValues = {
	  prestacion: null,
	  objetivo: null,
	  prestacion2: null,
	  objetivo2: null,
	  interventor: null,
	  interventor2 : null,
	};

	dataSchema = Yup.object().shape({
	  objetivo: Yup.string()
	  .required("Debe seleccionar un objetivo"),
	});
	joven_id = window.location.href.substring((window.location.href.lastIndexOf('/')) + 1);
	centro_id = 1;
	gestor_caso = 1;

	handleChangePrestacion (event:any, input:any) {
		event.persist();
		let name= "";
		switch(input){
			case 'prestacion':
				name = 'interventores';
				break;
			case 'prestacion2':
				name = 'interventores2';
				break;
		}
		axios.get(urlServerAPI + "interventores_por_prestacion/" + event.target.value)
		   .then(res => {
		   		if(Object.keys(res.data).length > 0){
		   			this.setState(state => {
		      		return { 
		      			...state,
		      			[name] : res.data[0]
		       		};
		    		});
		   		}
		})
	}
	handleChangeObjetivo (event:any, input:any) {
		event.persist();
		document.getElementById(input).style.display = event.target.value == 5 ? 'block' : 'none';
	}

	handleSubmit = (event:any) => {
	    event.preventDefault();
	}

	fetchInitialData () {
		document.getElementById("glosa1").style.display = 'none';
		document.getElementById("glosa2").style.display = 'none';
		axios.get(urlServerAPI + "nuevo_plan_intervencion/" + this.joven_id + "/" + this.centro_id)
		   .then(res => {
		   	    if(Object.keys(res.data.joven).length > 0){
		   	    	this.setState(state => {
			      		return { 
			      			nombre :res.data.joven[0].nombre,
			      			fecha_nac :moment(res.data.joven[0].fecha_nac).format("DD/MM/YYYY"),
				      		casa : res.data.cama.length > 0 ? res.data.cama[0][0].casa.nombre : "",
				      		cama : res.data.cama.length > 0 ? res.data.cama[0][0].nombre : "",
				      		prestaciones: res.data.prestaciones,
				      		objetivos: res.data.objetivos,
				      		calle: res.data.joven[0].calle,
				      		nro_casa: res.data.joven[0].num_casa,
				      		ciudad:  res.data.joven[0].ciudad,
				      		comuna:  res.data.joven[0].comuna
				        };
					})
		   	    } else {

		   	    }
		   		
		});
	}

	componentDidMount () {
    	this.fetchInitialData()
	}

  render() {
	  return (

    <Formik
      initialValues={this.initialValues}
      validationSchema={this.dataSchema}
      onSubmit={(values) => {
	     var pi = {
	     	"plan_intervencion": {
		   		"centro_id" : this.centro_id,
		   		"joven_id" : this.joven_id,
		   		"estado": 1,
		 		"gestor_caso_asignado_id": this.gestor_caso,
				"objetivo_intervencion": [{
					"objetivo_id": values.objetivo,
					"objetivo_interventor_prestacion": [{
				           "usuario_id": values.interventor,
				           "prestacion_id": values.prestacion
				     }]
				}],
			}
    	};
    	if(values.objetivo2 != "") {
      		let data = {
      			"objetivo_id": values.objetivo2,
				"objetivo_interventor_prestacion": [{
		           "usuario_id": values.interventor2,
		           "prestacion_id": values.prestacion2
		     	}]
			}
			pi["plan_intervencion"]["objetivo_intervencion"].push(data);
		}
		axios.post(urlServerAPI + 'generar_plan_intervencion', pi )
		.then(res => {
		})
      }}>
      {(formik) => {
        const { errors, touched, isValid, dirty, handleChange, handleSubmit, setFieldValue } = formik;
        return (
          <div className="container-fluid">
          	<h1>GENERAR PLAN DE INTERVENCIÓN</h1>
          	<div className="lh1"></div>
            <Form className="ingreso-form" onSubmit={handleSubmit}>

              <div className="border-red">
              <div className="form-row form-inline titulo-seccion">
              		<div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faUserCircle} className="faicon" />
              				<h3>Información Básica Joven</h3>
              		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Label>Nombre</Form.Label>
	                <Form.Label className="info-campo">
	                {this.state.nombre}
	                </Form.Label>
	             </Col>
	             <Col sm={2} className="campo-form">
	                <Form.Label>Fecha Nacimiento</Form.Label>
	                <Form.Label className="info-campo">{this.state.fecha_nac}</Form.Label>
	             </Col>
	             <Col sm={2} className="campo-form">
	                <Form.Label>Casa</Form.Label>
	                <Form.Label className="info-campo">{this.state.casa != "" ? this.state.casa : <div className="error">No Asignado</div>}</Form.Label>
	             </Col>
	             <Col sm={2} className="campo-form">
	                <Form.Label>Cama</Form.Label>
	                <Form.Label className="info-campo">{this.state.cama != "" ? this.state.cama : <div className="error">No Asignado</div>}</Form.Label>
	             </Col>
	             <Col sm={2} className="campo-form">
            		<Button className="float-right boton-superior" variant="outline-danger">Ver Ficha Personal</Button>
	             </Col>
              </div>
            </div>
			<div className="form-row form-inline titulo-seccion">
		        <div className="v1"></div>
          		<div className="titulo-seccion form-inline">
      				<FontAwesomeIcon icon={faUserCircle} className="faicon" />
      				<h3>Plan de Intervención</h3>
          		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="objetivo">
				    <Form.Label>Objetivo</Form.Label>
					<select 
				      name="objetivo"
			          className="campo-select custom-select"
			          onChange={(evt) => {setFieldValue('objetivo',  evt.target.value ); this.handleChangeObjetivo(evt,'glosa1');}}
			        >
			        <option >
					    Seleccione una opción
					</option>
				    {this.state.objetivos.map((item:any) => (
					  <option key={item.id} value={item.id}>
					    {item.nombre}
					  </option>
					))}
				   </select>
				  </Form.Group>
	              <ErrorMessage name="objetivo" component="span" className="error" />
	              <Field
	              	  id="glosa1"
	                  type="text"
	                  name="glosa1"
	                  className="form-control "
	               />
	             </Col>
	             <Col sm={3} className="campo-form">
				    <Form.Group controlId="comuna_persona">
				    <Form.Label>Prestación</Form.Label>
				    <select 
				      name="prestacion"
			          className="campo-select custom-select"
			          onChange={(e) => {
						        handleChange(e);
						        this.handleChangePrestacion(e,'prestacion');
						    }}
			        >
			        <option >
					    Seleccione una opción
					</option>
				    {this.state.prestaciones.map((item:any) => (
					  <option key={item.id} value={item.id}>
					    {item.nombre}
					  </option>
					))}
					</select>
				  </Form.Group>
	              <ErrorMessage name="comuna_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
				    <Form.Group controlId="interventor">
				    <Form.Label>Interventor</Form.Label>
				    <select 
				      name="interventor"
			          className="campo-select custom-select"
			          onChange={(evt) => setFieldValue('interventor',  evt.target.value )}
			        >
			        <option >
					    Seleccione una opción
					</option>
				    {this.state.interventores.map((item:any) => (
					  <option key={item.id} value={item.id}>
					    {item.nombre}
					  </option>
					))}
					</select>
				  </Form.Group>
	              <ErrorMessage name="interventor" component="span" className="error" />
	             </Col>

              </div>
              <br/>
              <hr/>
              <Collapse isOpened={this.state.collapse} >
	              <div className="form-row form-inline">
		             <Col sm={3} className="campo-form">
		                <Form.Group controlId="objetivo2">
					    <Form.Label>Objetivo</Form.Label>
					    <select 
					      id="objetivo2"
					      name="objetivo2"
				          className="campo-select custom-select"
				          onChange={(evt) => {setFieldValue('objetivo2',  evt.target.value ); this.handleChangeObjetivo(evt,'glosa2')}}
				        >
				        <option >
						    Seleccione una opción
						</option>
					    {this.state.objetivos.map((item:any) => (
						  <option key={item.id} value={item.id}>
						    {item.nombre}
						  </option>
						))}
					   </select>
					  </Form.Group>
		              <ErrorMessage name="objetivo2" component="span" className="error" />
		              <Field
		              	  id="glosa2"
		                  type="text"
		                  name="glosa2"
		                  className="form-control "
		               />
		             </Col>
		             <Col sm={3} className="campo-form">
					    <Form.Group controlId="prestacion2">
					    <Form.Label>Prestación</Form.Label>
					    <select 
					      name="prestacion2"
				          className="campo-select custom-select"
				          onChange={(e) => {
						        handleChange(e);
						        this.handleChangePrestacion(e,'prestacion2');
						    }}
				        >
				        <option >
						    Seleccione una opción
						</option>
					    {this.state.prestaciones.map((item:any) => (
						  <option key={item.id} value={item.id}>
						    {item.nombre}
						  </option>
						))}
						</select>
					  </Form.Group>
		              <ErrorMessage name="prestacion2" component="span" className="error" />
		             </Col>
		             <Col sm={3} className="campo-form">
					    <Form.Group controlId="comuna_persona">
					    <Form.Label>Interventor</Form.Label>
					    <select 
					      name="interventor2"
				          className="campo-select custom-select"
				          onChange={(evt) => setFieldValue('interventor2',  evt.target.value )}
				        >
				        <option >
						    Seleccione una opción
						</option>
					    {this.state.interventores2.map((item:any) => (
						  <option key={item.id} value={item.id}>
						    {item.nombre}
						  </option>
						))}
						</select>
					  </Form.Group>
		              <ErrorMessage name="comuna_persona" component="span" className="error" />
		             </Col>
	 	             <Col sm={1} className="campo-form info-campo">
		              <Form.Label className="info-campo"> -</Form.Label>
	              		<Button className="boton-agrega-item" type="button" 
		                 variant="outline-danger"> +
	                	</Button>
	              	</Col>
	              </div>
			  </Collapse>

              <hr/>
              <div className="form-row form-inline">
              	<Col sm={10} className="campo-form">
              	</Col>
              	<Col sm={1} className="campo-form ">

              		<Button onClick={this.toggle} className="boton-agrega-item" type="button" 
	                 variant="outline-danger">{this.state.text}
                	</Button>
              	</Col>
              </div>
              <hr/>
              <div className="form-row form-button">
              	<Button type="submit" 
	                className={!(dirty && isValid) ? "disabled-btn float-right boton-superior" : "float-right boton-superior"}
	                disabled={!(dirty && isValid)} variant="outline-danger">GUARDAR PLAN DE INTERVENCIÓN
	            </Button>
                <Button type="submit" 
	                className={!(dirty && isValid) ? "disabled-btn float-right boton-superior" : "float-right boton-superior"}
	                disabled={!(dirty && isValid)} variant="outline-danger">GUARDAR BORRADOR
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  )
  }
};

export default PlanIntervencion;