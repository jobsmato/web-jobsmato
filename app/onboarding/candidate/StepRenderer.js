import React from 'react';
import { Card, Button, Input, Select, TagInput, DatePicker, PillGroup } from '../../components/ui';
import { UserGraduate, Briefcase } from 'lucide-react'; // or your icon set

const options = {
  workStatus: [
    { value: 'fresher', label: "I'm a fresher", icon: <UserGraduate className="text-xl" /> },
    { value: 'experienced', label: "I'm experienced", icon: <Briefcase className="text-xl" /> },
  ],
  isEmployed: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  salaryNoticePills: [
    "15 Days or less", "1 Month", "2 Months", "3 Months", "More than 3 Months"
  ],
  cities: ['New Delhi', 'Bengaluru', 'Mumbai', 'Chennai'],
  degrees: ['Graduation/Diploma', 'Post Graduation', '12th', '10th'],
  courses: ['B.Sc', 'B.Tech', 'B.A', 'B.Com'],
  courseTypes: ['Full Time', 'Part Time', 'Distance'],
  specializations: ['Maths', 'Physics', 'Computer Science', 'CSE'],
  universities: [
    'Delhi Technological University', 'IIT Bombay', 'NIT Trichy'
  ],
  gradingSystems: [
    "Scale 10 Grading System", "Scale 7 Grading System", "Percentage"
  ],
  keySkills: ["Teaching", "Mathematics", "Computer Science", "CSE", "Leadership", "Teamwork", "Data Analysis"]
};

export const StepRenderer = ({
  step, answer, error, isCurrent, onNext, onFieldBlur, dispatch
}) => {
  // Step1: Work Status
  if (step.ui === 'workStatus') {
    return (
      <div aria-label="Choose your work status" className="flex gap-4 justify-center">
        {options.workStatus.map(opt => (
          <Card
            key={opt.value}
            onClick={() => onNext({ [step.key]: opt.value })}
            tabIndex={0}
            role="button"
            aria-label={opt.label}
            className={`flex-1 flex flex-col items-center py-6 cursor-pointer rounded-2xl transition-all ring-2
              ${answer === opt.value ? 'ring-primary shadow-xl bg-primary/5' : 'ring-gray-100'}`}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') onNext({ [step.key]: opt.value })
            }}
          >
            <span className="mb-2">{opt.icon}</span>
            <span className="text-md font-semibold">{opt.label}</span>
          </Card>
        ))}
      </div>
    );
  }

  // Step2 (Experienced): Are you currently employed?
  if (step.ui === 'isEmployed') {
    return (
      <div aria-label="Are you currently employed?" className="w-full flex flex-col items-center">
        <span className="mb-4 text-lg font-medium">Are you currently employed?</span>
        <div className="flex gap-4">
          {options.isEmployed.map(opt => (
            <Button
              key={String(opt.value)}
              variant={answer === opt.value ? "primary" : "outline"}
              rounded="pill"
              aria-pressed={answer === opt.value}
              onClick={() => onNext({ [step.key]: opt.value })}
              aria-label={opt.label}
            >{opt.label}</Button>
          ))}
        </div>
      </div>
    );
  }

  // Step3: Total Work Experience
  if (step.ui === 'workExperience') {
    return (
      <div aria-label="Total Work Experience" className="flex flex-col md:flex-row gap-4 items-center">
        <span className="text-md font-medium mr-2">Total Work Experience</span>
        <Select
          options={[...Array(20)].map((_, i) => ({ value: i, label: `${i} Years` }))}
          placeholder="Select year"
          value={answer?.year || ''}
          onChange={val => onNext({ [step.key]: { ...answer, year: val }})}
          onBlur={() => onFieldBlur(step.key, answer?.year)}
          hasError={!!error}
        />
        <Select
          options={[...Array(12)].map((_, i) => ({ value: i, label: `${i} Month${i !== 1 ? 's' : ''}` }))}
          placeholder="Select month"
          value={answer?.month || ''}
          onChange={val => onNext({ [step.key]: { ...answer, month: val }})}
          onBlur={() => onFieldBlur(step.key, answer?.month)}
          hasError={!!error}
        />
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
    );
  }

  // Step4: Company & Role
  if (step.ui === 'companyRole') {
    return (
      <div aria-label="Company and Role" className="flex flex-col gap-4">
        <Input
          label="Company name"
          placeholder="Eg. Amazon"
          value={answer?.company || ''}
          onChange={val => onNext({ [step.key]: { ...answer, company: val }})}
          onBlur={() => onFieldBlur(`${step.key}.company`, answer?.company)}
          hasError={!!error?.company}
        />
        <Input
          label="Current job title"
          placeholder="Eg. Software Developer"
          value={answer?.jobTitle || ''}
          onChange={val => onNext({ [step.key]: { ...answer, jobTitle: val }})}
          onBlur={() => onFieldBlur(`${step.key}.jobTitle`, answer?.jobTitle)}
          hasError={!!error?.jobTitle}
        />
        <TagInput
          label="Current city"
          placeholder="New Delhi"
          options={options.cities}
          value={answer?.city || ''}
          onChange={city => onNext({ [step.key]: { ...answer, city } })}
          onBlur={() => onFieldBlur(`${step.key}.city`, answer?.city)}
          hasError={!!error?.city}
          suggestions
        />
      </div>
    );
  }

  // Step5: Duration
  if (step.ui === 'duration') {
    return (
      <div aria-label="Employment Duration" className="flex flex-col gap-4">
        <div className="flex gap-4">
          <DatePicker
            label="From"
            value={answer?.from || ''}
            onChange={date => onNext({ [step.key]: { ...answer, from: date }})}
            views={['year', 'month']}
            placeholder="MM/YYYY"
            onBlur={() => onFieldBlur(`${step.key}.from`, answer?.from)}
            hasError={!!error?.from}
          />
          <DatePicker
            label="To"
            value={answer?.to || 'Present'}
            onChange={date => onNext({ [step.key]: { ...answer, to: date }})}
            views={['year', 'month']}
            placeholder="MM/YYYY"
            disabled={true}
          />
        </div>
      </div>
    );
  }

  // Step6: Compensation & Notice
  if (step.ui === 'compensationNotice') {
    return (
      <div aria-label="Salary and Notice Period" className="flex flex-col gap-4">
        <Input
          label="Annual Salary (CTC)"
          placeholder="Eg. 5,64,000"
          value={answer?.salary || ''}
          onChange={salary => onNext({ [step.key]: { ...answer, salary }})}
          onBlur={() => onFieldBlur(`${step.key}.salary`, answer?.salary)}
          prefix="₹"
          type="number"
          min={0}
          hasError={!!error?.salary}
        />
        <PillGroup
          label="Notice period"
          options={options.salaryNoticePills.map(label => ({ label }))}
          selected={answer?.noticePeriod || ''}
          onChange={val => onNext({ [step.key]: { ...answer, noticePeriod: val }})}
        />
      </div>
    );
  }

  // Fresher-only block
  if (step.ui === 'education') {
    return (
      <div aria-label="Education Details" className="flex flex-col gap-4">
        <Select
          label="Highest qualification / Degree"
          options={options.degrees.map(deg => ({ value: deg, label: deg }))}
          value={answer?.degree || ''}
          onChange={val => onNext({ [step.key]: { ...answer, degree: val }})}
          onBlur={() => onFieldBlur(`${step.key}.degree`, answer?.degree)}
          hasError={!!error?.degree}
        />
        <Select
          label="Course"
          options={options.courses.map(deg => ({ value: deg, label: deg }))}
          value={answer?.course || ''}
          onChange={val => onNext({ [step.key]: { ...answer, course: val }})}
          onBlur={() => onFieldBlur(`${step.key}.course`, answer?.course)}
          hasError={!!error?.course}
        />
        <Select
          label="Course type"
          options={options.courseTypes.map(ct => ({ value: ct, label: ct }))}
          value={answer?.courseType || ''}
          onChange={val => onNext({ [step.key]: { ...answer, courseType: val }})}
        />
        <Select
          label="Specialization"
          options={options.specializations.map(val => ({ value: val, label: val }))}
          value={answer?.specialization || ''}
          onChange={val => onNext({ [step.key]: { ...answer, specialization: val }})}
        />
        <Select
          label="University / Institute"
          options={options.universities.map(u => ({ value: u, label: u }))}
          value={answer?.university || ''}
          onChange={val => onNext({ [step.key]: { ...answer, university: val }})}
        />
        <div className="flex gap-4">
          <Select
            label="Starting year"
            options={[...Array(8)].map((_, idx) => {
              const year = 2018 + idx;
              return { value: year, label: String(year) }
            })}
            value={answer?.startYear || ''}
            onChange={val => onNext({ [step.key]: { ...answer, startYear: val }})}
          />
          <Select
            label="Passing year"
            options={[...Array(8)].map((_, idx) => {
              const year = 2021 + idx;
              return { value: year, label: String(year) }
            })}
            value={answer?.passingYear || ''}
            onChange={val => onNext({ [step.key]: { ...answer, passingYear: val }})}
          />
        </div>
        <Select
          label="Grading system"
          options={options.gradingSystems.map(gs => ({ value: gs, label: gs }))}
          value={answer?.gradingSystem || ''}
          onChange={val => onNext({ [step.key]: { ...answer, gradingSystem: val }})}
        />
        <Input
          label="CGPA(out of 10)"
          type="number"
          placeholder="Eg. 9.2"
          value={answer?.cgpa || ''}
          onChange={val => onNext({ [step.key]: { ...answer, cgpa: val }})}
          min={0}
          max={10}
          step={0.01}
          onBlur={() => onFieldBlur(`${step.key}.cgpa`, answer?.cgpa)}
          hasError={!!error?.cgpa}
        />
        <TagInput
          label="Key Skills"
          options={options.keySkills}
          value={answer?.skills || []}
          onChange={skills => onNext({ [step.key]: { ...answer, skills }})}
          multiple
        />
      </div>
    );
  }

  return null;
};
