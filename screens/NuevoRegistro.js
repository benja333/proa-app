import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../firebase/firebaseConfig';

export default function NuevoRegistro() {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [historiaClinica, setHistoriaClinica] = useState('');
  const [sexo, setSexo] = useState('M');
  const [edad, setEdad] = useState('');
  const [piso, setPiso] = useState('2do H');
  const [cama, setCama] = useState('');
  const [medico, setMedico] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [droga, setDroga] = useState('');
  const [dosis, setDosis] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [tipoTerapia, setTipoTerapia] = useState('Empírica');
  const [foco, setFoco] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = async () => {
    const usuario = auth.currentUser?.email || '';
    const payload = {
      nombrePaciente,
      historiaClinica,
      sexo,
      edad,
      piso,
      cama,
      medico,
      especialidad,
      droga,
      dosis,
      frecuencia,
      fechaIngreso,
      fechaInicio,
      tipoTerapia,
      foco,
      observaciones,
      usuario,
    };

    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbzG0V4O6EUu9tiEooydwp3sf7lTaJdix89Hs6P1HNfqPOkFRJp92fZl_tVcgVWX1Z2vQQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Alert.alert('Éxito', 'Registro enviado correctamente');
      } else {
        Alert.alert('Error', 'No se pudo enviar el registro');
      }
    } catch (error) {
      console.error('Error al enviar datos', error);
      Alert.alert('Error', 'Ocurrió un error al enviar');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre del paciente</Text>
      <TextInput style={styles.input} value={nombrePaciente} onChangeText={setNombrePaciente} />

      <Text style={styles.label}>Historia Clínica</Text>
      <TextInput style={styles.input} value={historiaClinica} onChangeText={setHistoriaClinica} keyboardType="numeric" />

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

      <Text style={styles.label}>Médico</Text>
      <TextInput style={styles.input} value={medico} onChangeText={setMedico} />

      <Text style={styles.label}>Especialidad</Text>
      <TextInput style={styles.input} value={especialidad} onChangeText={setEspecialidad} />

      <Text style={styles.label}>Droga</Text>
      <TextInput style={styles.input} value={droga} onChangeText={setDroga} />

      <Text style={styles.label}>Dosis</Text>
      <TextInput style={styles.input} value={dosis} onChangeText={setDosis} keyboardType="numeric" />

      <Text style={styles.label}>Frecuencia</Text>
      <TextInput style={styles.input} value={frecuencia} onChangeText={setFrecuencia} keyboardType="numeric" />

      <Text style={styles.label}>Fecha de ingreso (dd/mm/aaaa)</Text>
      <TextInput style={styles.input} value={fechaIngreso} onChangeText={setFechaIngreso} />

      <Text style={styles.label}>Fecha de inicio (dd/mm/aaaa)</Text>
      <TextInput style={styles.input} value={fechaInicio} onChangeText={setFechaInicio} />

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

