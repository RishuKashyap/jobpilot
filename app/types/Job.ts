export type Job = {
  id?: number
  company: string
  title: string
  date: string
  status: string
  notes: string
  user_id?:string
}


export type JobCardProps = {
  job: Job
  onDelete: () => void
  onEdit: () => void
}

export type JobModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: Job) => void
  formData: Job
  setFormData: React.Dispatch<React.SetStateAction<Job>>
  isEditing: boolean
}