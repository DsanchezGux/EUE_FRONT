import React, { Component, Fragment, useState} from 'react';
import { Form, Button, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import "./Ingreso.scss";
import { faUserCircle, faFolderOpen, faExclamation, faUsers,faGavel, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {urlServerAPI} from "../../../config/config";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import moment from 'moment';
import { validateRut } from '@fdograph/rut-utilities';

require('typeface-roboto-condensed')

interface IIngresoState {
	foto: any;
	regiones: any;
	casas: any;
	gestores_caso: any;
	tribunales:any;
	tipos_regimen: any;
	camas : any;
	relaciones : any;
	fecha_ingreso : any;
	fecha_nac:any;
	rut : any;
	joven: any;
	region:any;
	ciudad:any;
	comuna:any;
	nombre:any;
	telefono:any;
	email:any;
	telefono_persona:any;
	calle:any;
	nro_casa:any;
	run_persona:any;
	run_familiar:any;
	nombre_persona:any;
	ruc:any;
	tribunal:any;
	rit:any;
	gestor_caso_asignado_id:any;
	medidas_cautelares:any;
	tipo_regimen:any;
	abogado_defensor:any;
	suspenciones_condicionales:any;
	delito:any;
	casa:any;
	cama_id:any;
	sancion_mixta:any;
	fecha_inicio_sancion:any;
	fecha_termino_sancion:any;
	duracion_anios:any;
	duracion_meses:any;
	duracion_abonos:any;
	informacion_judicial:any;
	persona:any;
	cama:any;
	file: any;
	email_persona:any;
	relacion_persona:any;
	region_persona:any;
	comuna_persona:any;
	ciudad_persona:any;
	ciudades_joven:any;
	ciudades_persona:any;
	ciudades_familiar:any;
    comunas_joven:any;
	comunas_persona:any;
	comunas_familiar:any;
	sexo:any;
	calle_persona:any;
	num_casa_persona:any;
	nombre_familiar:any;
	telefono_familiar:any;
	email_familiar:any;
	relacion_familiar:any;
	region_familiar:any;
	comuna_familiar:any;
	ciudad_familiar:any;
}

export class Ingreso extends Component<{}, IIngresoState> {

  constructor(props:any) {
    super(props)
  	this.state = {
			casas: [],
			gestores_caso:[],
			regiones:[],
			tribunales:[],
			ciudades_joven:[],
			ciudades_persona:[],
			ciudades_familiar:[],
			comunas_joven:[],
			comunas_persona:[],
			comunas_familiar:[],
			camas:[],
			relaciones:[],
			medidas_cautelares:[],
			tipos_regimen:[],
			rut: "",
			fecha_ingreso: new Date(),
			fecha_nac:new Date(),
			nombre:"",
			region:"",
			ciudad:"",
			comuna:"",
			calle:"",
			calle_persona:"",
			num_casa_persona:"",
			nro_casa:"",
			telefono:"",
			email:"",
			tipo_regimen: "",
			ruc:"",
			tribunal:"",
			rit:"",
			gestor_caso_asignado_id:"",
			abogado_defensor:"",
			suspenciones_condicionales:"",
			delito:"",
			casa:"",
			cama_id:"",
			sancion_mixta: false,
			fecha_inicio_sancion:new Date(),
			fecha_termino_sancion:new Date(),
			duracion_anios:0,
			duracion_meses:0,
			duracion_abonos:0,
			joven:[],
			informacion_judicial:[],
			persona:[],
			cama:[],
			file: "",
			foto: "",
			run_persona:"",
			nombre_persona:"",
			telefono_persona:"",
			email_persona:"",
			relacion_persona:"",
			region_persona:"",
			comuna_persona:"",
			ciudad_persona:"",
			run_familiar:"",
			nombre_familiar:"",
			telefono_familiar:"",
			email_familiar:"",
			relacion_familiar:"",
			region_familiar:"",
			comuna_familiar:"",
			ciudad_familiar:"",
			sexo:""
	  };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeCasa = this.handleChangeCasa.bind(this);
    this.handleChangeRegion = this.handleChangeRegion.bind(this);
    this.handleChangeCiudad = this.handleChangeCiudad.bind(this);
    this.handleChangeCama = this.handleChangeCama.bind(this);
  }

  initialValues = {
  	num_casa:"",
  	sexo:"",
		rut: "",
		fecha_ingreso: new Date(),
		fecha_nac:new Date(),
		nombre:"",
		region:"",
		ciudad:"",
		comuna:"",
		calle:"",
		nro_casa:"",
		telefono:"",
		email:"",
		ruc:"",
		tribunal:"",
		rit:"",
		gestor_caso_asignado_id:"",
		medidas_cautelares:"",
		tipo_regimen:"",
		abogado_defensor:"",
		suspenciones_condicionales:"",
		delito:"",
		tribunales: [],
		//   casa:"",
		//   cama_id:"",
		sancion_mixta:false,
		fecha_inicio_sancion:new Date(),
		fecha_termino_sancion:new Date(),
		duracion_anios:0,
		duracion_meses:0,
		duracion_abonos:0,
		file: "",
		foto: "",
		run_persona:"",
		nombre_persona:"",
		telefono_persona:"",
		email_persona:"",
		relacion_persona:"",
		region_persona:"",
		comuna_persona:"",
		ciudad_persona:"",
		calle_persona:"",
		num_casa_persona:"",
		run_familiar:"",
		calle_familiar:"",
		nombre_familiar:"",
		telefono_familiar:"",
		email_familiar:"",
		relacion_familiar:"",
		region_familiar:"",
		comuna_familiar:"",
		ciudad_familiar:"",
		num_casa_familiar:"",
		cama_id:"",
		relacion : ""
	};

	centro_id = 1;

	handleSubmit = (event:any) => {
	    event.preventDefault();

	    const joven = {
		  "centro_id": 1,
		  "joven": {
		    "fecha_nac" : "",
		    "nombre": "",
		    "region": ""
		  },
		  "persona": [{
		    "sexo": "m",
		    "fecha_nac" : "1991-08-21",
		    "telefono" : "m",
		    "ciudad" : "m",
		    "comuna" : "m",
		    "nombre": "Daniel",
		    "region": "m",
		    "calle": "m",
		    "num_casa": "m",
		    "mail": "2",
		    "relacion":"tio"
		  }],
		  "adulto_significativo": {
		    
		  },
		  "informacion_judicial": {
		    "RIT": "m",
		    "RUC" : "b"
		  },
		  "cama":{"cama_id":2}
		};
	  }

	dataSchema = Yup.object().shape({
	  email_persona: Yup.string()
        .email("Debe ingresar un email válido"),
      email_familiar: Yup.string()
        .email("Debe ingresar un email válido"),
      duracion_anios: Yup.number().integer("Debe ingresar un valor entero"),
      duracion_meses: Yup.number().integer("Debe ingresar un valor entero"),
      duracion_abonos: Yup.number().integer("Debe ingresar un valor entero"),
      run_persona: Yup.string().required("Debe ingresar un adulto significativo")
			.test("test-name", "Debe ingresar un rut válido", 
            value=> validateRut(value)
            ),
      rut: Yup.string().required("Debe ingresar un adulto significativo")
			.test("test-name", "Debe ingresar un rut válido", 
            value=> validateRut(value)
            ),
      run_familiar: Yup.string().required("Debe ingresar un adulto significativo")
			.test("test-name", "Debe ingresar un rut válido", 
            value=> validateRut(value)
            )
	});

	handleChangeCasa (event:any) {
		axios.get(urlServerAPI + "camas_por_casa/" + event.target.value)
		   .then(res => {
				this.setState(state => {
		      		return {
		      		...state,
		      		camas : res.data
		       };
		   });
		})
	}

	handleChangeRegion (event:any, input:any) {
		event.persist();
		let name= "";
		switch(input){
			case 'region':
				name = 'ciudades_joven';
				break;
			case 'region_persona':
				name = 'ciudades_persona';
				break;
			case 'region_familiar':
				name = 'ciudades_familiar';
				break;
			
		}

		axios.get(urlServerAPI + "ciudades_por_region/" + event.target.value)
		   .then(res => {
				if(Object.keys(res.data).length > 0){
		   			this.setState(state => {
		      		return { 
		      			...state,
		      			[name] : res.data
		       		};
		    		});
		   	}
		})
	}

	handleChangeCiudad (event:any) {
		event.persist();
		let name= "";
		switch(event.target.id){
			case 'ciudades_joven':
				name = 'comunas_joven';
				break;
			case 'ciudades_persona':
				name = 'comunas_persona';
				break;
			case 'ciudades_familiar':
				name = 'comunas_familiar';
				break;
		}
		axios.get(urlServerAPI + "comunas_por_ciudad/" + event.target.value)
		   .then(res => {
		   		if(Object.keys(res.data).length > 0){
		   			this.setState(state => {
		      		return { 
		      			...state,
		      			[event.target.id] :  event.target.value,
		      			[name] : res.data
		       		};
		    		});
		   		}
		})
	}

	handleChangeCama (event:any) {
		this.setState(state => {
			return { 
				...state,
				 cama_id : event.target.value,
	 		};
	 	});
	}

	fetchInitialData () {
	 	let relacionesList = [
			{"id": 0, "nombre": "SIN INFORMACION"},
			{"id": 14, "nombre": "PADRE"},
			{"id": 15, "nombre": "MADRE"},
			{"id": 16, "nombre": "HERMANO(A)"},
			{"id": 17, "nombre": "TÍO(A)"},
			{"id": 18, "nombre": "HIJO(A)"},
			{"id": 19, "nombre": "ABUELO(A)"},
			{"id": 20, "nombre": "PRIMO(A)"},
			{"id": 21, "nombre": "OTRO FAMILIAR"},
			{"id": 22, "nombre": "PAREJA"},
			{"id": 23, "nombre": "AMIGO(A)"},
			{"id": 24, "nombre": "VECINO(A)"},
			{"id": 25, "nombre": "CUIDADOR(A)"},
			{"id": 26, "nombre": "OTRO ADULTO"},
			{"id": 27, "nombre": "FAMILIA SUSTITUTA"},
			{"id": 28, "nombre": "PADRASTRO O CONVIVIENTE DE LA MADRE"},
			{"id": 29, "nombre": "MADRASTRA O CONVIVIENTE DEL PADRE"},
			{"id": 30, "nombre": "SE DESCONOCE RELACION"},
			{"id": 31, "nombre": "FUNCIONARIO(A) DE LA RED"},
			{"id": 32, "nombre": "PERSONAL ESTABLECIMIENTO SALUD"},
			{"id": 33, "nombre": "PERSONAL DEPTO. MUNICIPAL"},
			{"id": 34, "nombre": "PERSONAL ORGANIZACION COMUNITARIA"},
			{"id": 35, "nombre": "GRUPO INFORMAL"},
			{"id": 36, "nombre": "PERSONAL INSTITUCION PRIVADA"},
			{"id": 37, "nombre": "PERONAL ESTABLECIMIENTO EDUCACIONAL"},
			{"id": 38, "nombre": "NO CORRESPONDE"},
			{"id": 39, "nombre": "CONVIVIENTE"},
			{"id": 40, "nombre": "PADRE Y MADRASTRA O CONVIVIENTE"},
			{"id": 41, "nombre": "MADRE Y PADRASTRO O CONVIVIENTE"},
			{"id": 42, "nombre": "PADRE Y/O MADRE Y/O HERMANO"},
			{"id": 43, "nombre": "AMBOS PADRES"},
			{"id": 44, "nombre": "EMPLEADOR(A)"},
			{"id": 45, "nombre": "BISABUELO(A)  "},
			{"id": 46, "nombre": "SOBRINO(A)"},
			{"id": 48, "nombre": "HERMANO"},
			{"id": 49, "nombre": "HERMANA"},
			{"id": 50, "nombre": "TIO"},
			{"id": 51, "nombre": "TIA"},
			{"id": 52, "nombre": "ABUELO"},
			{"id": 53, "nombre": "ABUELA"},
			{"id": 54, "nombre": "VECINO"},
			{"id": 55, "nombre": "VECINA"},
			{"id": 56, "nombre": "FUNCIONARIO DE LA RED"},
			{"id": 58, "nombre": "FUNCIONARIA DE LA RED"},
			{"id": 63, "nombre": "PADRE Y HERMANOS"},
			{"id": 64, "nombre": "MADRE Y HERMANOS"},
			{"id": 65, "nombre": "PAR DEL MISMO PROYECTO O CENTRO"},
			{"id": 66, "nombre": "PAR EXTERNO (Colegio, Club, etc)"},
			{"id": 67, "nombre": "DIRECTOR CENTRO RESIDENCIA"},
			{"id": 68, "nombre": "FAMILIAR"},
			{"id": 69, "nombre": "OTRO"},
			{"id": 70, "nombre": "NNA - NIÑO,NIÑA O ADOLESCENTE"},
			{"id": 71, "nombre": "CUÑADO(A)"},
			{"id": 72, "nombre": "SUEGRO(A)"},
			{"id": 73, "nombre": "NUERA"},
			{"id": 74, "nombre": "YERNO"}
	 	];
	 	let tribunalesList = [
	 		{"id":1,"nombre":"1° TRIBUNAL DE JUICIO ORAL EN LO PENAL DE SANTIAGO"},
	 		{"id":2,"nombre":"2° TRIBUNAL DE JUICIO ORAL EN LO PENAL DE SANTIAGO"},
	 		{"id":3,"nombre":"3° TRIBUNAL DE JUICIO ORAL EN LO PENAL DE SANTIAGO"},
	 		{"id":4,"nombre":"4° TRIBUNAL DE JUICIO ORAL EN LO PENAL DE SANTIAGO"},
	 		{"id":5,"nombre":"5° TRIBUNAL DE JUICIO ORAL EN LO PENAL DE SANTIAGO"}
	 	];
	 	let medidasCautelaresList = [
			{'id':1,'nombre':'Citación'},
			{'id':2,'nombre':'Detención'},
			{'id':3,'nombre':'Prisión preventiva'},
			{'id':4,'nombre':'Otras medidas cautelares personales establecidas en el artículo 155 del Código Procesal Penal:'},
			{'id':5,'nombre':'Privación de libertad total o parcial domiciliaria.'},
			{'id':6,'nombre':'Sujeción a vigilancia de una persona o institución determinada.'},
			{'id':7,'nombre':'Arraigo nacional o local.'},
			{'id':8,'nombre':'Prohibición de asistir a determinados lugares.'},
			{'id':9,'nombre':'Prohibición de acercarse a ciertas personas.'},
			{'id':10,'nombre':'Prohibición de acercarse al ofendido o su familia'},
			{'id':11,'nombre':'Prohibición de poseer, tener o portar armas de fuegos, municiones o cartuchos.'},
			{'id':12,'nombre':'Obligación de abandonar un inmueble determinado'}
	 	];
	 	let tipoRegimenList = [
	 		{'id':1,'nombre':'Tipo Régimen 1'},
			{'id':2,'nombre':'Tipo Régimen 2'},
			{'id':3,'nombre':'Tipo Régimen 3'}
	 	];
		axios.get(urlServerAPI + "nuevo_ingreso_joven/"+this.centro_id)
		   .then(res => {
				this.setState(state => {
		      		return { 
		      		regiones : res.data.regiones,
		      		casas : res.data.casas,
		      		gestores_caso : res.data.gestores_de_caso,
		      		camas : [],
		      		tipos_regimen :tipoRegimenList,
		      		relaciones : relacionesList,
		      		fecha_ingreso: new Date(),
		      		fecha_nac: new Date(),
		      		fecha_inicio_sancion: new Date(),
		      		fecha_termino_sancion: new Date(),
		      		tribunales: tribunalesList,
		      		medidas_cautelares : medidasCautelaresList
		       };
		   });
		})
	}

	componentDidMount () {
    	this.fetchInitialData()
	}

	agregarFamiliar (e:any) {
		e.preventDefault();
		console.log(e);
	}

	handleInputChange (event:any, element?:any){
		console.log(event);
		console.log(element);
		const target = element != null ? null : event.target;
    const value = element != null ? event : target.value;
    const name = element != null ? element : target.name;
		this.setState(state => {
	  	  return { 
	  		...state,
	  		[name]: value
	  	  };
	  });	
	}

  render() {
    return ( 

    <Formik
      initialValues={this.initialValues}
      validationSchema={this.dataSchema}
      onSubmit={(values) => {

      	var joven = {

      		"centro_id" : this.centro_id,
      		"foto":values.foto,
      		"joven": {
      			"run":values.rut,
      			"fecha_ingreso":moment(values.fecha_ingreso).format("YYYY-MM-DD"),
      			"fecha_nac": moment(values.fecha_nac).format("YYYY-MM-DD"),
      			"nombre": values.nombre,
      			"region": values.region,
      			"sexo": values.sexo,
      			"num_casa": values.num_casa,
      			"calle": values.calle
      		},
					"persona": [{
						"telefono": values.telefono_persona,
						"ciudad": values.ciudad_persona,
						"comuna": values.comuna_persona,
						"region": values.region_persona,
						"nombre": values.nombre_persona,
						"rut": values.run_persona,
						"calle": values.calle_persona,
						"num_casa":values.num_casa_persona,
						"email":values.email,
						"adulto_significativo": 1,
						"relacion": values.relacion,
					}],
					"informacion_judicial": values.rit != "" && values.ruc != "" ? {
						"rit":values.rit,
						"ruc":values.ruc,
						"fecha_inicio_sancion":moment(values.fecha_inicio_sancion).format("YYYY-MM-DD"),
						"fecha_termino_sancion":moment(values.fecha_termino_sancion).format("YYYY-MM-DD"),
						"duracion_anios":values.duracion_anios,
						"duracion_meses":values.duracion_meses,
						"duracion_abonos":values.duracion_abonos,
						"tipo_regimen":values.tipo_regimen,
						"sancion_mixta": values.sancion_mixta == true ? true : false,
						"gestor_caso_asignado_id":values.gestor_caso_asignado_id,
						"medidas_cautelares":values.medidas_cautelares,
						"abogado_defensor":values.abogado_defensor,
						"susp_condicionales":values.suspenciones_condicionales,
						"delito":values.delito,
					} : {},
		      		"cama": values.cama_id != "" ? {
		      			"cama_id": values.cama_id
		      		} : {}
		      	};

		      	if(values.run_familiar != "") {
		      		let data = {
						"telefono": values.telefono_familiar,
						"ciudad": values.ciudad_familiar,
						"comuna": values.comuna_familiar,
						"region": values.region_familiar,
						"nombre": values.nombre_familiar,
						"rut": values.run_familiar,
						"calle": values.calle_familiar,
						"num_casa":values.num_casa_familiar,
						"email":values.email,
						"adulto_significativo": 0,
						"relacion": values.relacion_familiar
					}
					joven["persona"].push(data);
				}

				axios.post(urlServerAPI + 'ingresar_joven', joven)
				.then(res => {
		  				alert("Ingreso de joven creado, ID JOVEN: "+ res.data);
				})
      }}
      >
      {(formik) => {
        const { errors, touched, isValid, dirty, handleSubmit, values,handleChange ,handleBlur, setFieldValue} = formik;
        return (
          <div className="container-fluid">
            <Button className="float-right boton-superior" variant="danger"><FontAwesomeIcon icon={faExclamation} className="boton" />Prestaciones de Urgencia</Button>

            <Button className="float-right boton-superior" variant="primary"><FontAwesomeIcon icon={faFolderOpen} className="boton" />Ver Carpeta Judicial</Button>
          	<h1>FORMULARIO DE INGRESO</h1>
          	<div className="lh1"></div>
            <Form className="ingreso-form" onSubmit={this.handleSubmit} >
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Label>RUN</Form.Label>
	                <Field
	                  type="text"
	                  name="rut"
	                  id="rut"
	                  autoComplete="off" 
	                  className={errors.rut && touched.rut ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="rut" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Fecha de Ingreso</Form.Label>
	                <DatePicker
									  onChange={(date, dateString) => setFieldValue('fecha_ingreso',  date )}
									  dateFormat="dd/MM/YYY"
									  maxDate={moment().toDate()}
									  selected={values.fecha_ingreso}
									  className="form-control"
									/>
	                <ErrorMessage name="fecha_ingreso" component="span" className="error" />
	             </Col>
	             <Col sm={4} className="campo-form" >
	                <label >Subir Foto</label>
	                <input className="form-control" accept="image/png, image/jpeg, image/gif" name="foto" type="file" onChange={(evt) => {
                    evt.persist();if (evt !== undefined) {setFieldValue("foto", evt!.target!.files[0]!)}}}/>

	            </Col>
              </div>
              <hr/>
              <div className="form-row form-inline titulo-seccion">
              		<div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faUserCircle} className="faicon" />
              				<h3>Información Personal</h3>
              		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
              		<Col sm={3} className="campo-form">
	                <Form.Label>Nombre</Form.Label>
	                <Field
	                  autoComplete="off" 
	                  type="text"
	                  name="nombre"
	                  id="nombre"
	                  className={errors.nombre && touched.nombre ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="nombre" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Fecha de Nacimiento</Form.Label>
	                <DatePicker
									  onChange={(date, dateString) => setFieldValue('fecha_nac',  date )}
									  dateFormat="dd/MM/YYY"
									  maxDate={moment().toDate()}
									  selected={values.fecha_nac}
									  className="form-control"
									/>
	                <ErrorMessage name="fecha_nac" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
						<Form.Label>Sexo</Form.Label>
						<br/>
				    <div role="group" aria-labelledby="my-radio-group">
	            <label className="radiogroup" >
	              <Field  className="radiogroup" type="radio" name="sexo" value="f" />
	              	Femenino
		            </label>
		          <label  className="radiogroup" >
		            <Field className="radiogroup"  type="radio" name="sexo" value="m" />
		              Masculino
		            </label>
	          	</div>
	             </Col>
              </div>
              <p className="titulo-bold"><b>Dirección</b></p>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	              <Form.Group controlId="region">
				    <Form.Label>Región</Form.Label>
				    <select 
				      name="region"
			          className="campo-select custom-select"
			          onChange={(e) => {
						        handleChange(e);
						        this.handleChangeRegion(e,'region');
						    }}
			        >
			        <option >
						    Seleccione una opción
						  </option>
					    {this.state.regiones.map((region:any) => (
						  <option key={region.id} value={region.id}>
						    {region.nombre}
						  </option>
						))}
				    </select>
				  </Form.Group>
	              <ErrorMessage name="region" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="ciudad">
				    <Form.Label>Ciudad</Form.Label>
				    <Form.Control 
				       name="ciudad"
				       className="campo-select" 
				       as="select" 
				       size="sm" 
				       custom onChange={this.handleChangeCiudad}>
				       <option >
						    Seleccione una opción
						 	 </option>
					    {this.state.ciudades_joven.map((ciudad:any) => (
						  <option key={ciudad.id} value={ciudad.id}>
						    {ciudad.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="ciudad" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
				    <Form.Group controlId="comuna">
				    <Form.Label>Comuna</Form.Label>
				    <Form.Control 
				      name="comuna"
				      className="campo-select"
				      as="select" 
				      size="sm"
				      custom >
				        <option >
						    Seleccione una opción
						</option>
					    {this.state.comunas_joven.map((comuna:any) => (
						  <option key={comuna.id} value={comuna.id}>
						    {comuna.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="comuna" component="span" className="error" />
	             </Col>
              </div>
              <br/>
              <div className="form-row form-inline">
              		<Col sm={6} className="campo-form">
	                <Form.Label>Calle</Form.Label>
	                <Field
	                  autoComplete="off" 
	                  type="text"
	                  name="calle"
	                  id="calle"
	                  className={errors.calle && touched.calle ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="calle" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Casa</Form.Label>
	                <Field
	                  autoComplete="off" 
	                  type="text"
	                  name="num_casa"
	                  id="num_casa"
	                  className={errors.num_casa && touched.num_casa ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="num_casa" component="span" className="error" />
	             </Col>
                </div>
              <hr/>
              <div className="form-row form-inline titulo-seccion">
  		            <div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faUsers} className="faicon" />
              				<h3>Información Adulto Significativo</h3>
              		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
                <Col sm={3} className="campo-form">
	                <Form.Label>RUN</Form.Label>
	                <Field
	                  type="text"
	                  name="run_persona"
	                  className={errors.run_persona && touched.run_persona ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="run_persona" component="span" className="error" />
	             </Col>
              		<Col sm={3} className="campo-form">
	                <Form.Label>Nombre</Form.Label>
	                <Field
	                  type="text"
	                  name="nombre_persona"
	                  className={errors.nombre_persona && touched.nombre_persona ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="nombre_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="relacion">
								    <Form.Label>Relación</Form.Label>
								    <Form.Control
								      className="campo-select" 
								      as="select" 
								      size="sm"
								      custom onChange={(e) => {
						        		handleChange(e)}}>
								      <option >
										    Seleccione una opción
										  </option>
								    	{this.state.relaciones.map((relacion:any) => (
										  <option key={relacion.id} value={relacion.nombre}>
										    {relacion.nombre}
										  </option>
										))}
								    </Form.Control>
								  </Form.Group>
	              <ErrorMessage name="relacion" component="span" className="error" />
	             </Col>
              </div>
              <p className="titulo-bold"><b>Dirección</b></p>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	              <Form.Group controlId="region_persona">
				    <Form.Label>Región</Form.Label>
				    <Form.Control 
				      className="campo-select" 
				      as="select" 
				      size="sm" 
				      custom onChange={(e) => {
						        handleChange(e);
						        this.handleChangeRegion(e,'region_persona');
						    }}>
				         <option >
						    Seleccione una opción
						 </option>
				    	{this.state.regiones.map((region:any) => (
						  <option key={region.id} value={region.id}>
						    {region.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="region_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="ciudad_persona">
				    <Form.Label>Ciudad</Form.Label>
				    <Form.Control 
				      className="campo-select" 
				      as="select" 
				      size="sm" custom onChange={this.handleChangeCiudad}>
				       <option >
						   Seleccione una opción
					   </option>
					   {this.state.ciudades_persona.map((ciudad:any) => (
						  <option key={ciudad.id} value={ciudad.id}>
						    {ciudad.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="ciudad_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
				    <Form.Group controlId="comuna_persona">
				    <Form.Label>Comuna</Form.Label>
				    <Form.Control
				      className="campo-select" 
				      as="select" 
				      size="sm" custom>
				      <option >
						   Seleccione una opción
					   </option>
					   {this.state.comunas_persona.map((comuna:any) => (
						  <option key={comuna.id} value={comuna.id}>
						    {comuna.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="comuna_persona" component="span" className="error" />
	             </Col>
              </div>
              <br/>
              <div className="form-row form-inline">
              		<Col sm={6} className="campo-form">
	                <Form.Label>Calle</Form.Label>
	                <Field
	                  type="text"
	                  name="calle_persona"
	                  id="calle_persona"
	                  className={errors.calle_persona && touched.calle_persona ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="calle_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Casa</Form.Label>
	                <Field
	                  type="text"
	                  name="num_casa_persona"
	                  id="num_casa_persona"
	                  className={errors.num_casa_persona && touched.num_casa_persona ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="num_casa_persona" component="span" className="error" />
	             </Col>
                </div>
              <br/>
              <div className="form-row form-inline">
              		<Col sm={6} className="campo-form">
	                <Form.Label>Teléfono</Form.Label>
	                <Field
	                  type="telefono_persona"
	                  name="telefono_persona"
	                  id="telefono_persona"
	                  className={errors.telefono_persona && touched.telefono_persona ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="telefono_persona" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Correo Electrónico</Form.Label>
	                <Field
	                  type="email_persona"
	                  name="email_persona"
	                  id="email_persona"
	                  className={errors.email_persona && touched.email_persona ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="email_persona" component="span" className="error" />
	             </Col>
                </div>
              <hr/>
              <div className="form-row form-inline titulo-seccion">
  		            <div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faUsers} className="faicon" />
              				<h3>Información Familiar</h3>
              		</div>
              </div>
              <br/>
              <div id="seccion-familiar">
	              <div className="form-row form-inline">
	              	<Col sm={3} className="campo-form">
		                <Form.Group controlId="relacion_familiar">
									    <Form.Label>Familiar</Form.Label>
									    <select className="campo-select" >
									    		<option >
												    Seleccione una opción
												  </option>
									        {this.state.relaciones.map((relacion:any) => (
											  <option key={relacion.id} value={relacion.nombre}>
											    {relacion.nombre}
											  </option>
											))}
									    </select>
									  </Form.Group>
		              <ErrorMessage name="relacion_familiar" component="span" className="error" />
		            </Col>
	                <Col sm={3} className="campo-form">
		                <Form.Label>RUN</Form.Label>
		                <Field
		                  type="text"
		                  name="run_familiar"
		                  className={errors.run_familiar && touched.run_familiar ? 
		                  "form-control is-invalid input-error" : "form-control "}
		                />
		                <ErrorMessage name="run_familiar" component="span" className="error" />
		            </Col>
	              	<Col sm={3} className="campo-form">
		                <Form.Label>Nombre</Form.Label>
		                <Field
		                  type="text"
		                  name="nombre_familiar"
		                  className={errors.nombre_familiar && touched.nombre_familiar ? 
		                  "form-control is-invalid input-error" : "form-control "}
		                />
		                <ErrorMessage name="nombre_familiar" component="span" className="error" />
		             </Col>

	              </div>
	              <p className="titulo-bold"><b>Dirección</b></p>
	              <br/>
	              <div className="form-row form-inline">
	              	<Col sm={3} className="campo-form">
		              <Form.Group controlId="region_familiar">
					    <Form.Label>Región</Form.Label>
					    	<Form.Control className="campo-select" as="select" size="sm" custom onChange={(e) => {
						        handleChange(e);
						        this.handleChangeRegion(e,'region_familiar');
						    }}>
						    <option>
						    		Seleccione una opción
						    </option>
					       {this.state.regiones.map((region:any) => (
							  <option key={region.id} value={region.id}>
							    {region.nombre}
							  </option>
							))}
					    </Form.Control>
					  </Form.Group>
		           <ErrorMessage name="region_familiar" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="ciudad_familiar">
					    <Form.Label>Ciudad</Form.Label>
					    <select className="campo-select" >
		    				<option>
						    		Seleccione una opción
						    </option>
					       {this.state.ciudades_familiar.map((item:any) => (
							  <option key={item.id} value={item.id}>
							    {item.nombre}
							  </option>
							))}
					    </select>
					 		 </Form.Group>
		              <ErrorMessage name="ciudad_familiar" component="span" className="error" />
		             </Col>
		             <Col sm={3} className="campo-form">
					    <Form.Group controlId="comuna_familiar">
					    <Form.Label>Comuna</Form.Label>
					    <Form.Control className="campo-select" as="select" size="sm" custom>
					    	<option>
						    		Seleccione una opción
						    </option>
					      {this.state.comunas_familiar.map((item:any) => (
							  <option key={item.id} value={item.id}>
							    {item.nombre}
							  </option>
								))}
					    	</Form.Control>
					  		</Form.Group>
		              <ErrorMessage name="comuna_familiar" component="span" className="error" />
		             </Col>
	              </div>
	              <br/>
	              <div className="form-row form-inline">
	              		<Col sm={6} className="campo-form">
		                <Form.Label>Calle</Form.Label>
		                <Field
		                  type="text"
		                  name="calle_familiar"
		                  id="calle_familiar"
		                  className={errors.calle_familiar && touched.calle_familiar ? 
		                  "form-control is-invalid input-error" : "form-control "}
		                />
		                <ErrorMessage name="calle_familiar" component="span" className="error" />
		             </Col>
		             <Col sm={3} className="campo-form">
		                <Form.Label>Casa</Form.Label>
		                <Field
		                  type="text"
		                  name="num_casa_familiar"
		                  id="num_casa_familiar"
		                  className={errors.num_casa_familiar && touched.num_casa_familiar ? 
		                  "form-control is-invalid input-error" : "form-control"}
		                />
		                <ErrorMessage name="num_casa_familiar" component="span" className="error" />
		             </Col>
	                </div>
	              <br/>
	              <div className="form-row form-inline">
	              		<Col sm={6} className="campo-form">
		                <Form.Label>Teléfono</Form.Label>
		                <Field
		                  type="text"
		                  name="telefono_familiar"
		                  id="telefono_familiar"
		                  className={errors.telefono_familiar && touched.telefono_familiar ? 
		                  "form-control is-invalid input-error" : "form-control "}
		                />
		                <ErrorMessage name="telefono_familiar" component="span" className="error" />
		             </Col>
		             <Col sm={3} className="campo-form">
		                <Form.Label>Correo Electrónico</Form.Label>
		                <Field
		                  type="text"
		                  name="email_familiar"
		                  id="email_familiar"
		                  className={errors.email_familiar && touched.email_familiar ? 
		                  "form-control is-invalid input-error" : "form-control"}
		                />
		                <ErrorMessage name="email_familiar" component="span" className="error" />
		             </Col>
	                </div>
	           </div>
               <div className="form-row form-button">
                <Button type="button" onClick={this.agregarFamiliar} className="float-right boton-superior" variant="outline-danger">AGREGAR FAMILIAR</Button>
               </div>
                <hr/>
              <div className="form-row form-inline titulo-seccion">
  		            <div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faGavel} className="faicon" />
              				<h3>Datos Judiciales</h3>
              		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
                <Col sm={3} className="campo-form">
	                <Form.Label>RUC</Form.Label>
	                <Field
	                  type="text"
	                  name="ruc"
	                  className={errors.ruc && touched.ruc ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="ruc" component="span" className="error" />
	             </Col>
              		<Col sm={3} className="campo-form">
	                <Form.Label>RIT</Form.Label>
	                <Field
	                  type="text"
	                  name="rit"
	                  className={errors.rit && touched.rit ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="rit" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="tribunal">
					    <Form.Label>Tribunal</Form.Label>
					    <Form.Control 
					      className="campo-select" 
					      as="select" size="sm" custom>
					      <option >
							    Seleccione una opción
							  </option>
							   {this.state.tribunales.map((item:any) => (
							  <option key={item.id} value={item.nombre}>
							    {item.nombre}
							  </option>
							  ))}
				   		</Form.Control>
				    	
				  </Form.Group>
	              <ErrorMessage name="tribunal" component="span" className="error" />
	             </Col>
              </div>
              <p className="titulo-bold"><b>FECHA DE INICIO SANCIÓN</b></p>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Label>Fecha de Inicio</Form.Label>
	                <DatePicker
									  onChange={(date, dateString) => setFieldValue('fecha_inicio_sancion',  date )}
									  maxDate={moment().toDate()}
									  dateFormat="dd/MM/YYY"
									  selected={values.fecha_inicio_sancion}
									  className="form-control"
									/>
	                <ErrorMessage name="fecha_inicio_sancion" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Duración / años</Form.Label>
	                <Field
	                  type="text"
	                  name="duracion_anios"
	                  id="duracion_anios"
	                  className={errors.duracion_anios && touched.duracion_anios ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="duracion_anios" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Duración / meses</Form.Label>
	                <Field
	                  type="text"
	                  name="duracion_meses"
	                  id="duracion_meses"
	                  className={errors.duracion_meses && touched.duracion_meses ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="duracion_meses" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Duración / abonos</Form.Label>
	                <Field
	                  type="text"
	                  name="duracion_abonos"
	                  id="duracion_abonos"
	                  className={errors.duracion_abonos && touched.duracion_abonos ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="duracion_abonos" component="span" className="error" />
	             </Col>
              </div>
              <p className="titulo-bold"><b>FECHA DE TÉRMINO DE SANCIÓN</b></p>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Label>Fecha de término de sanción</Form.Label>
	                <DatePicker
									  onChange={(date, dateString) => setFieldValue('fecha_termino_sancion',  date )}
									  maxDate={moment().toDate()}
									  dateFormat="dd/MM/YYY"
									  selected={values.fecha_termino_sancion}
									  className="form-control"
									/>
	                <ErrorMessage name="fecha_termino_sancion" component="span" className="error" />
		             </Col>
		             <Col sm={3} className="campo-form">
		                <Form.Label>Sanción Mixta PLA, CRC, CSC</Form.Label>
		                <br/>
		               	<Field className="form-check-input" type="checkbox" name="sancion_mixta" />
	                   Seleccione
	            			<ErrorMessage name="sancion_mixta" component="span" className="error" />
	             </Col>
              </div>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	              <Form.Group controlId="tipo_regimen">
							    <Form.Label>Tipo de régimen (*)</Form.Label>
							    <Form.Control
							      className="campo-select" 
							      as="select" 
							      size="sm" custom>
							      <option >
											Seleccione una opción
										</option>
							    	{this.state.tipos_regimen.map((item:any) => (
									  <option key={item.id} value={item.nombre}>
									    {item.nombre}
									  </option>
									))}
							    </Form.Control>
							  </Form.Group>
	              <ErrorMessage name="tipo_regimen" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Group controlId="gestor_caso_asignado_id">
				    <Form.Label>Asignar Gestor de Caso</Form.Label>
				    <select 
				      name="gestor_caso_asignado_id"
				      className="campo-select" 
				        onChange={(e) => {
						        handleChange(e)}}>
				       <option >
							Seleccione una opción
						</option>
				    	{this.state.gestores_caso.map((gestor:any) => (
						  <option key={gestor.id} value={gestor.id}>
						    {gestor.nombre}
						  </option>
						))}
				    </select>
					  </Form.Group>
	          <ErrorMessage name="gestor_caso_asignado_id" component="span" className="error" />
            </Col>
             <Col sm={3} className="campo-form">
					    <Form.Group controlId="medidas_cautelares">
							    <Form.Label>Medidas Cautelares</Form.Label>
							    <Form.Control
							      className="campo-select"
							      as="select"
							      size="sm" custom>
							      <option >
										    Seleccione una opción
										 </option>
										 {this.state.medidas_cautelares.map((item:any) => (
										  <option key={item.id} value={item.nombre}>
										    {item.nombre}
										  </option>
										))}
								    </Form.Control>
					  		</Form.Group>
		            <ErrorMessage name="medidas_cautelares" component="span" className="error" />
		          </Col>
              </div>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Label>Abogado Defensor</Form.Label>
	                <Field
	                  type="text"
	                  name="abogado_defensor"
	                  id="abogado_defensor"
	                  className={errors.abogado_defensor && touched.abogado_defensor ? 
	                  "form-control is-invalid input-error" : "form-control "}
	                />
	                <ErrorMessage name="abogado_defensor" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Suspensiones Condicionales</Form.Label>
	                <Field
	                  type="text"
	                  name="suspenciones_condicionales"
	                  id="suspenciones_condicionales"
	                  className={errors.suspenciones_condicionales && touched.suspenciones_condicionales ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="suspenciones_condicionales" component="span" className="error" />
	             </Col>
	             <Col sm={3} className="campo-form">
	                <Form.Label>Delito</Form.Label>
	                <Field
	                  type="text"
	                  name="delito"
	                  id="delito"
	                  className={errors.delito && touched.delito ? 
	                  "form-control is-invalid input-error" : "form-control"}
	                />
	                <ErrorMessage name="delito" component="span" className="error" />
	             </Col>
                </div>
              <br/>
              <hr/>
              <div className="form-row form-inline titulo-seccion">
  		            <div className="v1"></div>
              		<div className="titulo-seccion form-inline">
              				<FontAwesomeIcon icon={faArrowDown} className="faicon" />
              				<h3>Datos de Internación</h3>
              		</div>
              </div>
              <br/>
              <div className="form-row form-inline">
              	<Col sm={3} className="campo-form">
	                <Form.Group controlId="casa">
				    <Form.Label>Asignar Casa</Form.Label>
				    <Form.Control onChange={value => {this.handleChangeCasa(value)}} className="campo-select" as="select" size="sm" custom>
				        <option >
						      Seleccione una opción
						 		</option>
				    	{this.state.casas.map((casa:any) => (
						  <option key={casa.id} value={casa.id}>
						    {casa.nombre}
						  </option>
						))}
				    </Form.Control>
				  </Form.Group>
	              <ErrorMessage name="casa" component="span" className="error" />
	            </Col>
	            <Col sm={3} className="campo-form">
	                <Form.Group controlId="cama_id">
				    <Form.Label>Asignar Cama</Form.Label>
				    <select 
				      name="cama_id"
			          className="campo-select custom-select"
			          onChange={(e) => {
						        handleChange(e);
						        
						    }}
			        >
			        <option >
						    Seleccione una opción
						  </option>
					    {this.state.camas.map((cama:any) => (
						  <option key={cama.id} value={cama.id}>
						    {cama.nombre}
						  </option>
						))}
				    </select>
				  </Form.Group>
	              <ErrorMessage name="cama_id" component="span" className="error" />
	            </Col>
                
              </div>
              <hr/>
              <div className="form-row form-button">
              		<Button type="submit" onClick={e => handleSubmit()}
                className={!(dirty && isValid) ? "disabled-btn float-right boton-superior" : "float-right boton-superior"}
                disabled={!(dirty && isValid)} variant="outline-danger">GUARDAR</Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  	)
  }
}

export default Ingreso;