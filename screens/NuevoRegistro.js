import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth } from '../firebase/firebaseConfig';

export default function NuevoRegistro() {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [apellidoPaciente, setApellidoPaciente] = useState('');
  const [historiaClinica, setHistoriaClinica] = useState('');
  const [sexo, setSexo] = useState('M');
  const [edad, setEdad] = useState('');
  const [piso, setPiso] = useState('2do H');
  const [cama, setCama] = useState('');
  const [nombreMedico, setNombreMedico] = useState('');
  const [apellidoMedico, setApellidoMedico] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [droga, setDroga] = useState('');
  const [dosis, setDosis] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [showFechaIngreso, setShowFechaIngreso] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [showFechaInicio, setShowFechaInicio] = useState(false);
  const [tipoTerapia, setTipoTerapia] = useState('Empírica');
  const [foco, setFoco] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateForm = () => {
    if (
      !nombrePaciente ||
      !apellidoPaciente ||
      !historiaClinica ||
      !edad ||
      !cama ||
      !nombreMedico ||
      !apellidoMedico ||
      !especialidad ||
      !droga ||
      !dosis ||
      !frecuencia ||
      !fechaIngreso ||
      !fechaInicio ||
      !foco
    ) {
      Alert.alert('Error', 'Todos los campos obligatorios deben estar completos');
      return false;
    }

    if (!/^[0-9]{6}$/.test(historiaClinica)) {
      Alert.alert('Error', 'Historia Clínica debe tener 6 dígitos');
      return false;
    }

    const numeric = [
      { value: edad, name: 'Edad', positive: true },
      { value: cama, name: 'Cama' },
      { value: dosis, name: 'Dosis' },
      { value: frecuencia, name: 'Frecuencia' },
    ];

    for (const { value, name, positive } of numeric) {
      if (value === '' || isNaN(value)) {
        Alert.alert('Error', `${name} debe ser un número válido`);
        return false;
      }
      if (positive && Number(value) <= 0) {
        Alert.alert('Error', `${name} debe ser un número positivo`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const usuario = auth.currentUser?.email || '';
    const payload = {
      nombrePaciente,
      apellidoPaciente,
      historiaClinica,
      sexo,
      edad: Number(edad),
      piso,
      cama: Number(cama),
      nombreMedico,
      apellidoMedico,
      especialidad,
      droga,
      dosis: Number(dosis),
      frecuencia: Number(frecuencia),
      fechaIngreso: formatDate(fechaIngreso),
      fechaInicio: formatDate(fechaInicio),
      tipoTerapia,
      foco,
      observaciones,
      usuario,
    };

    try {
      const res = await fetch(
        'http://localhost:3000/enviar',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log('Response:', data);

      if (data && data.success) {
        Alert.alert('Registro ingresado con éxito');
        setNombrePaciente('');
        setApellidoPaciente('');
        setHistoriaClinica('');
        setSexo('M');
        setEdad('');
        setPiso('2do H');
        setCama('');
        setNombreMedico('');
        setApellidoMedico('');
        setEspecialidad('');
        setDroga('');
        setDosis('');
        setFrecuencia('');
        setFechaIngreso('');
        setFechaInicio('');
        setTipoTerapia('Empírica');
        setFoco('');
        setObservaciones('');
      } else {
        Alert.alert('Error al enviar');
      }
    } catch (error) {
      console.error('Error al enviar datos', error);
      Alert.alert('Error al enviar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre del paciente</Text>
      <TextInput style={styles.input} value={nombrePaciente} onChangeText={setNombrePaciente} />

      <Text style={styles.label}>Apellido del paciente</Text>
      <TextInput style={styles.input} value={apellidoPaciente} onChangeText={setApellidoPaciente} />

      <Text style={styles.label}>Historia Clínica</Text>
      <TextInput
        style={styles.input}
        value={historiaClinica}
        onChangeText={setHistoriaClinica}
        keyboardType="numeric"
        maxLength={6}
      />

      <Text style={styles.label}>Sexo</Text>
      <Picker selectedValue={sexo} onValueChange={setSexo} style={styles.input}>
        <Picker.Item label="M" value="M" />
        <Picker.Item label="F" value="F" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <Text style={styles.label}>Edad</Text>
      <TextInput style={styles.input} value={edad} onChangeText={setEdad} keyboardType="numeric" />

      <Text style={styles.label}>Piso</Text>
      <Picker selectedValue={piso} onValueChange={setPiso} style={styles.input}>
        <Picker.Item label="2do H" value="2do H" />
        <Picker.Item label="2do M" value="2do M" />
        <Picker.Item label="3ro H" value="3ro H" />
        <Picker.Item label="3ro M" value="3ro M" />
        <Picker.Item label="UTI" value="UTI" />
      </Picker>

      <Text style={styles.label}>Cama</Text>
      <TextInput style={styles.input} value={cama} onChangeText={setCama} keyboardType="numeric" />

      <Text style={styles.label}>Nombre del médico</Text>
      <TextInput style={styles.input} value={nombreMedico} onChangeText={setNombreMedico} />

      <Text style={styles.label}>Apellido del médico</Text>
      <TextInput style={styles.input} value={apellidoMedico} onChangeText={setApellidoMedico} />

      <Text style={styles.label}>Especialidad</Text>
      <TextInput style={styles.input} value={especialidad} onChangeText={setEspecialidad} />

      <Text style={styles.label}>Droga</Text>
      <TextInput style={styles.input} value={droga} onChangeText={setDroga} />

      <Text style={styles.label}>Dosis</Text>
      <TextInput style={styles.input} value={dosis} onChangeText={setDosis} keyboardType="numeric" />

      <Text style={styles.label}>Frecuencia</Text>
      <TextInput style={styles.input} value={frecuencia} onChangeText={setFrecuencia} keyboardType="numeric" />

      <Text style={styles.label}>Fecha de ingreso</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={fechaIngreso}
          onChangeText={setFechaIngreso}
          placeholder="dd/mm/aaaa"
          type="date"
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowFechaIngreso(true)}>
            <TextInput
              style={styles.input}
              value={formatDate(fechaIngreso)}
              editable={false}
              placeholder="dd/mm/aaaa"
            />
          </TouchableOpacity>
          {showFechaIngreso && (
            <DateTimePicker
              value={fechaIngreso ? new Date(fechaIngreso) : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowFechaIngreso(false);
                if (date) setFechaIngreso(date);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Fecha de inicio</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={fechaInicio}
          onChangeText={setFechaInicio}
          placeholder="dd/mm/aaaa"
          type="date"
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowFechaInicio(true)}>
            <TextInput
              style={styles.input}
              value={formatDate(fechaInicio)}
              editable={false}
              placeholder="dd/mm/aaaa"
            />
          </TouchableOpacity>
          {showFechaInicio && (
            <DateTimePicker
              value={fechaInicio ? new Date(fechaInicio) : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowFechaInicio(false);
                if (date) setFechaInicio(date);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Tipo de terapia</Text>
      <Picker selectedValue={tipoTerapia} onValueChange={setTipoTerapia} style={styles.input}>
        <Picker.Item label="Empírica" value="Empírica" />
        <Picker.Item label="Dirigida" value="Dirigida" />
        <Picker.Item label="Definitiva" value="Definitiva" />
        <Picker.Item label="Profilaxis" value="Profilaxis" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <Text style={styles.label}>Foco</Text>
      <TextInput style={styles.input} value={foco} onChangeText={setFoco} />

      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <View style={{ marginVertical: 20 }}>
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
});
